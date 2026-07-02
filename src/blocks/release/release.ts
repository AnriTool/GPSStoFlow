import image from './image.png'
import imageNoArrow from './imageNoArrow.png'
import {AbstractBlock} from '../abstractBlock';

const paramOptions = {
	x: 128,
	y: 0,
	fontSize: 10,
};

export class Release extends AbstractBlock {
	protected blockHeight = 46;

	protected param;

	constructor(params: string[], antV:boolean = false) {
		super(antV);
		[this.param] = params;
	}

	public getHtml():HTMLElement {
		const gpssBlock     = document.createElement('div');
		gpssBlock.className = 'gpss-block';

		const imgEl = document.createElement("img")
		imgEl.src   = <string>(this.antV ? imageNoArrow : image);
		gpssBlock.appendChild((imgEl));

		const paramBlock     = document.createElement('p');
		paramBlock.innerText = this.param;
		paramBlock.className = 'gpss-param';

		paramBlock.style.left      = paramOptions.x + 'px';
		paramBlock.style.top       = paramOptions.y + 'px';
		paramBlock.style.fontSize  = paramOptions.fontSize + 'px';
		paramBlock.contentEditable = String(true);

		gpssBlock.appendChild(paramBlock);

		return gpssBlock;
	}
}