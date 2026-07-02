import image from './image.png'
import imageNoArrow from './imageNoArrow.png'
import {TRANSFORM_CENTER} from '../../utils/StyleHelper';
import {AbstractBlock} from '../abstractBlock';

const sizeParamOptions = {
	x: 63,
	y: 30,
	fontSize: 14,
};

const nameParamOptions = {
	x: 126,
	y: 0,
	fontSize: 10,
};

export class Leave extends AbstractBlock {
	protected blockHeight = 46;

	protected paramSize;
	protected paramName;

	constructor(params: string[], antV:boolean = false) {
		super(antV);
		[this.paramName, this.paramSize] = params[0].split(',');
	}

	public getHtml():HTMLElement {
		const gpssBlock     = document.createElement('div');
		gpssBlock.className = 'gpss-block';

		const imgEl = document.createElement("img")
		imgEl.src   = <string>(this.antV ? imageNoArrow : image);
		gpssBlock.appendChild((imgEl));


		const nameParamBlock     = document.createElement('p');
		nameParamBlock.innerText = this.paramName;
		nameParamBlock.className = 'gpss-param';

		nameParamBlock.style.left      = nameParamOptions.x + 'px';
		nameParamBlock.style.top       = nameParamOptions.y + 'px';
		nameParamBlock.style.fontSize  = nameParamOptions.fontSize + 'px';
		nameParamBlock.contentEditable = String(true);

		gpssBlock.appendChild(nameParamBlock);

		if (!this.paramSize) {
			return gpssBlock;
		}

		const sizeParamBlock     = document.createElement('p');
		sizeParamBlock.innerText = this.paramSize;
		sizeParamBlock.className = 'gpss-param';

		sizeParamBlock.style.left      = sizeParamOptions.x + 'px';
		sizeParamBlock.style.top       = sizeParamOptions.y + 'px';
		sizeParamBlock.style.fontSize  = sizeParamOptions.fontSize + 'px';
		sizeParamBlock.style.transform = TRANSFORM_CENTER;
		sizeParamBlock.contentEditable = String(true);

		gpssBlock.appendChild(sizeParamBlock);


		return gpssBlock;
	}
}