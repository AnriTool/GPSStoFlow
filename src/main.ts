import {GpssParser} from "./utils/GpssParser";
import {gpssBlocks} from "./utils/GpssBlocks";
import {toPng} from 'html-to-image';


const codeTextArea       = document.getElementById('textarea');
const diagramMainBlock   = document.getElementById('diagram');
const drawButton         = document.getElementById('draw');
const downloadButton     = document.getElementById('download');
const backgroundCheckbox = document.getElementById('background');
const fileName           = document.getElementById('fileName');
const diagramTable       = document.getElementById('diagramTable');

codeTextArea.innerHTML =
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

drawButton.onclick = function () {
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
};

downloadButton.onclick = function () {
	downloadDiagram(diagramTable);
}

async function downloadDiagram(element: HTMLElement): Promise<void> {
	const data = await toPng(element, {
		backgroundColor: (backgroundCheckbox.checked ? '#F0F0F0' : undefined)
	})

	const link = document.createElement('a');
	console.log(fileName.value);
	link.download = (fileName.value ? fileName.value : 'gpssDiagram') + '.png';
	link.href     = data;
	link.click()
}
