import image from './image.png'
import {TRANSFORM_CENTER} from '../../utils/StyleHelper';

const nameParamOptions = {
	x: 63,
	y: 30,
	fontSize: 14,
};

const sizeParamOptions = {
	x: 126,
	y: 34,
	fontSize: 10,
};

export class Enter {
	protected paramName;
	protected paramSize;

	constructor(params: string[]) {
		[this.paramSize, this.paramName] = params[0].split(',');
	}

	public getHtml():HTMLElement {
		const gpssBlock     = document.createElement('div');
		gpssBlock.className = 'gpss-block';

		const imgEl = document.createElement("img")
		imgEl.src   = <string>image;
		gpssBlock.appendChild((imgEl));

		const nameParamBlock     = document.createElement('p');
		nameParamBlock.innerText = this.paramName;
		nameParamBlock.className = 'gpss-param';

		nameParamBlock.style.left      = nameParamOptions.x + 'px';
		nameParamBlock.style.top       = nameParamOptions.y + 'px';
		nameParamBlock.style.fontSize  = nameParamOptions.fontSize + 'px';
		nameParamBlock.style.transform = TRANSFORM_CENTER;
		nameParamBlock.contentEditable = String(true);

		gpssBlock.appendChild(nameParamBlock);

		const sizeParamBlock     = document.createElement('p');
		sizeParamBlock.innerText = this.paramSize;
		sizeParamBlock.className = 'gpss-param';

		sizeParamBlock.style.left      = sizeParamOptions.x + 'px';
		sizeParamBlock.style.top       = sizeParamOptions.y + 'px';
		sizeParamBlock.style.fontSize  = sizeParamOptions.fontSize + 'px';
		sizeParamBlock.contentEditable = String(true);

		gpssBlock.appendChild(sizeParamBlock);

		return gpssBlock;
	}
}