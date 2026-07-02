import image from './image.png'
import imageNoArrow from './imageNoArrow.png'
import {TRANSFORM_CENTER} from '../../utils/StyleHelper';
import {AbstractBlock} from '../abstractBlock';

const paramOptions = {
	x: 63,
	y: 33,
	fontSize: 14,
};

export class Gather extends AbstractBlock {
	protected blockHeight = 46;

	protected params;

	constructor(params: string[], antV:boolean = false) {
		super(antV);
		[this.params] = params;
	}

	public getHtml():HTMLElement {
		const gpssBlock     = document.createElement('div');
		gpssBlock.className = 'gpss-block';

		const imgEl = document.createElement("img")
		imgEl.src   = <string>(this.antV ? imageNoArrow : image);
		gpssBlock.appendChild((imgEl));

		const paramBlock     = document.createElement('p');
		paramBlock.innerText = this.params;
		paramBlock.className = 'gpss-param';

		paramBlock.style.left      = paramOptions.x + 'px';
		paramBlock.style.top       = paramOptions.y + 'px';
		paramBlock.style.fontSize  = paramOptions.fontSize + 'px';
		paramBlock.style.transform = TRANSFORM_CENTER;
		paramBlock.contentEditable = String(true);

		gpssBlock.appendChild(paramBlock);

		return gpssBlock;
	}
}