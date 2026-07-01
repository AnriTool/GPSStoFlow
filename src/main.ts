import {GpssParser} from "./GpssParser";


const codeTextArea = document.getElementById('textarea');
const diagramMainBLock = document.getElementById('diagram');
const submitButton = document.getElementById('submit2');



console.log(codeTextArea.textContent)


submitButton.onclick = function () {
	if (null === codeTextArea || null === diagramMainBLock) {
		return;
	}

	const gpssText = codeTextArea.textContent;

	const gpssElements = GpssParser.parse(gpssText);
	console.log(gpssElements);

	gpssElements.forEach((el) => {
		const gpssBlock = document.createElement('div')
		gpssBlock.className = 'gpss-block';


		if ('LABEL' === el.type) {
			gpssBlock.innerText = el.params[0];
		}
		else {
			const imgEl = document.createElement("img")
			imgEl.draggable = true;
			imgEl.src = '../images/' + el.type  + '.png';

			gpssBlock.appendChild((imgEl));

		}

		diagramMainBLock.appendChild(gpssBlock);
	})

};

//
// function parseGpss(text) {
// 	console.log('test')
// 	console.log(
//
// 	);
// }
//
