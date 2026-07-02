import image from './image.png'
import imageNoArrow from './imageNoArrow.png'
import {AbstractBlock} from '../abstractBlock';

const paramOptions = {
	x: 98,
	y: 14,
	fontSize: 14,
};

export class Match extends AbstractBlock {
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
		paramBlock.contentEditable = String(true);

		gpssBlock.appendChild(paramBlock);

		return gpssBlock;
	}
}