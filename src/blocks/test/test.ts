import image from './image.png'
import {TRANSFORM_CENTER, TRANSFORM_TO_LEFT} from '../../utils/StyleHelper';

const operationParamOption = {
	x: 63,
	y: 26,
	fontSize: 14,
};

const fstParamOption = {
	x: 37,
	y: 3,
	fontSize: 14,
};

const scndParamOption = {
	x: 91,
	y: 3,
	fontSize: 14,
};

const pathParamOption = {
	x: 132,
	y: 24,
	fontSize: 14,
};

export class Test {
	protected fstParam;
	protected scndParam;
	protected operationParam;
	protected pathParam;

	constructor(params: string[]) {
		this.operationParam                             = params[0];
		[this.fstParam, this.scndParam, this.pathParam] = (params[1] ? params[1].split(',') : []);
	}

	public getHtml():HTMLElement {
		const gpssBlock     = document.createElement('div');
		gpssBlock.className = 'gpss-block';

		const imgEl = document.createElement("img")
		imgEl.src   = <string>image;
		gpssBlock.appendChild((imgEl));

		const operationBlock     = document.createElement('p');
		operationBlock.innerText = this.operationParam;
		operationBlock.className = 'gpss-param';

		operationBlock.style.left      = operationParamOption.x + 'px';
		operationBlock.style.top       = operationParamOption.y + 'px';
		operationBlock.style.fontSize  = operationParamOption.fontSize + 'px';
		operationBlock.style.transform = TRANSFORM_CENTER;
		operationBlock.contentEditable = String(true);

		gpssBlock.appendChild(operationBlock);

		const fstParamBlock     = document.createElement('p');
		fstParamBlock.innerText = this.fstParam;
		fstParamBlock.className = 'gpss-param';

		fstParamBlock.style.left      = fstParamOption.x + 'px';
		fstParamBlock.style.top       = fstParamOption.y + 'px';
		fstParamBlock.style.fontSize  = fstParamOption.fontSize + 'px';
		fstParamBlock.style.transform = TRANSFORM_TO_LEFT;
		fstParamBlock.contentEditable = String(true);

		gpssBlock.appendChild(fstParamBlock);

		const scndParamBlock     = document.createElement('p');
		scndParamBlock.innerText = this.scndParam;
		scndParamBlock.className = 'gpss-param';

		scndParamBlock.style.left      = scndParamOption.x + 'px';
		scndParamBlock.style.top       = scndParamOption.y + 'px';
		scndParamBlock.style.fontSize  = scndParamOption.fontSize + 'px';
		scndParamBlock.contentEditable = String(true);

		gpssBlock.appendChild(scndParamBlock);

		const pathParamBlock     = document.createElement('p');
		pathParamBlock.innerText = this.pathParam;
		pathParamBlock.className = 'gpss-param';

		pathParamBlock.style.left      = pathParamOption.x + 'px';
		pathParamBlock.style.top       = pathParamOption.y + 'px';
		pathParamBlock.style.fontSize  = pathParamOption.fontSize + 'px';
		pathParamBlock.contentEditable = String(true);

		gpssBlock.appendChild(pathParamBlock);

		return gpssBlock;
	}
}