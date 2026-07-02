import {GpssParser} from "./utils/GpssParser";
import {gpssBlocks} from "./utils/GpssBlocks";
import {Export, Graph, Shape} from '@antv/x6'
import * as antVHelper from "./utils/antVHelper";
import {Text} from './blocks/text/text';
import {Terminate} from './blocks/terminate/terminate';
import {Transfer} from './blocks/transfer/transfer';
import {Select} from './blocks/select/select';
import {domToPng} from 'modern-screenshot'

const codeTextArea       = document.getElementById('textarea');
const diagramMainBlock   = document.getElementById('diagram');
const antVdiagramBlock   = document.getElementById('antVdiagram');
const drawButton         = document.getElementById('draw');
const downloadButton     = document.getElementById('download');
const backgroundCheckbox = document.getElementById('background');
const fileName           = document.getElementById('fileName');
const diagramTable       = document.getElementById('diagramTable');

const version =  document.getElementById('version');
let IsAntV    = true;

const exampleCode =
`BL1 GENERATE a,b,c,d,e,f 
ADVANCE a,b
QUEUE a,b
DEPART a,b
SEIZE a
RELEASE a
ENTER a,b
LEAVE a,b
TRANSFER a,b,c
TRANSFER a,b
BL2 MARK a
PRIORITY a
ASSIGN a+,b 
BL3 SELECT x a,b,c,d,e,f 
SELECT x a,b,c,d,e
TEST x a,b,c
SPLIT a,b,c
MATCH a
ASSEMBLE a
GATHER a
SAVEVALUE a,b
TERMINATE a`;


const reallyCode =
`GENERATE (POISSON(1,.83))
SELECT E 1,1,5,0,F,SCND
FST QUEUE P1
SEIZE P1
DEPART P1
PRIORITY 1
ADVANCE (EXPONENTIAL(1,0,FN$TIME))
RELEASE P1
TERMINATE

SCND SELECT MIN 1,1,5,,Q
TRANSFER ,FST

GENERATE 720
TERMINATE 1

START 1
`
codeTextArea.innerHTML = reallyCode;

drawButton.onclick = function () {
	if (IsAntV) {
		drawAntV();
	}
	else {
		drawDefault()
	}
};

downloadButton.onclick = function () {
	if (IsAntV) {
		downloadDiagramAntV();
	}
	else {
		downloadDiagram(diagramTable);
	}
}

// @ts-ignore
const graph = new Graph(antVHelper.getGraphConfig(antVdiagramBlock))
graph.use(new Export());

Shape.HTML.register(antVHelper.getCustomHtmlNodeConfig());

function drawAntV() {
	const gpssText = codeTextArea.value;

	if (!gpssText) {
		return;
	}

	const gpssElements = GpssParser.parse(gpssText);
	graph.clearCells();
	const toLable       = new Map;
	const fromLable     = new Map;
	const fromLableType = new Map;

	let prevBlock = null;
	let offset    = 100;

	gpssElements.forEach((el) => {
		if (gpssBlocks[el.type]) {
			const gpss = new gpssBlocks[el.type](el.params, true);
			const htmlBlock = gpss.getHtml();

			const node = graph.addNode(antVHelper.getNode(offset, htmlBlock))

			if (el.label) {
				toLable.set(el.label, node);
			}

			const {prevNode, prevGpss} = prevBlock ?? {}

			if (prevNode && prevGpss && !(gpss instanceof Text)) {
				// @ts-ignore
				graph.addEdge(antVHelper.getDefaultEdge(prevNode, node, prevGpss.getHeight()));
			}

			if (!(gpss instanceof Text)) {
				prevBlock = {prevNode:node, prevGpss:gpss};
			}

			if ((gpss instanceof Terminate)) {
				prevBlock = {}
			}

			if ((gpss instanceof Transfer)) {
				if (!gpss.getBranching()[1]) {
					fromLable.set(gpss.getBranching()[0], node)
					fromLableType.set(gpss.getBranching()[0], gpss)

					prevBlock = {}
				}
				else {
					fromLable.set(gpss.getBranching()[1], node)
					fromLableType.set(gpss.getBranching()[1], gpss)
				}
			}

			if ((gpss instanceof Select)) {
				if (gpss.getBranching()[0]) {
					fromLable.set(gpss.getBranching()[0], node)
					fromLableType.set(gpss.getBranching()[0], gpss)
				}
			}

			offset += gpss.getHeight() + 60;
		}
	})

	fromLable.forEach((value, key) => {
		if (toLable.has(key)) {

			if (fromLableType.get(key) instanceof Transfer) {
				// @ts-ignore
				graph.addEdge(antVHelper.getTransferEdge(fromLable.get(key), toLable.get(key)));
			}

			if (fromLableType.get(key) instanceof Select) {
				// @ts-ignore
				graph.addEdge(antVHelper.getSelectEdge(fromLable.get(key), toLable.get(key)));
			}

		}
	})
}

function drawDefault() {
	const gpssText = codeTextArea.value;

	if (!gpssText) {
		return;
	}

	const gpssElements = GpssParser.parse(gpssText);
	diagramMainBlock.replaceChildren();

	gpssElements.forEach((el) => {
		if (gpssBlocks[el.type]) {
			diagramMainBlock.appendChild(new gpssBlocks[el.type](el.params).getHtml());
		}
	})
}

async function downloadDiagram(element: HTMLElement): Promise<void> {
	const data = await domToPng(element, {
		backgroundColor: (backgroundCheckbox.checked ? '#F0F0F0' : undefined),
		quality:1,
	})

	const link = document.createElement('a');
	console.log(fileName.value);
	link.download = (fileName.value ? fileName.value : 'gpssDiagram') + '.png';
	link.href     = data;
	link.click()
}

async function downloadDiagramAntV() {
	graph.grid.hide();
	const clone     = antVdiagramBlock.cloneNode(true);
	const graphBbox = graph.getAllCellsBBox();

	clone.style.height = `${graphBbox.height + 200}px`

	clone.querySelectorAll('.x6-cell-tools').forEach(el => el.remove());
	clone.querySelectorAll('.x6-graph-svg-viewport')[0].removeAttribute('transform');

	document.body.appendChild(clone);

	const dataUrl = await domToPng(clone, {
		backgroundColor: (backgroundCheckbox.checked ? '#F0F0F0' : undefined),
		quality:1,
		features: {
			foreignObject: true,
			removeControlCharacter: false,
		},
	});

	const link = document.createElement('a');
	link.download = (fileName.value ? fileName.value : 'gpssDiagram') + '.png';
	link.href = dataUrl;
	link.click();

	graph.grid.show();

	clone.remove()
}

version.addEventListener('change', () => {
	const selectedRadio = document.querySelector('input[name="version"]:checked');

	IsAntV = 'antV' === selectedRadio.value;

	diagramMainBlock.hidden = IsAntV;
	antVdiagramBlock.hidden = !IsAntV;

	codeTextArea.innerHTML = (IsAntV ? reallyCode : exampleCode)

	if (IsAntV) {
		antVdiagramBlock.style.height = '90vh'
	}
});
