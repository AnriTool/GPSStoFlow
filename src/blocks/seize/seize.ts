import image from './image.png'

const paramOptions = {
	x: 128,
	y: 34,
	fontSize: 10,
};

export class Seize {
	protected param;

	constructor(params: string[]) {
		[this.param] = params;
	}

	public getHtml():HTMLElement {
		const gpssBlock     = document.createElement('div');
		gpssBlock.className = 'gpss-block';

		const imgEl = document.createElement("img")
		imgEl.src   = <string>image;
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