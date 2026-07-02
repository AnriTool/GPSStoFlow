import image from './image.png'
import imageNoArrow from './imageNoArrow.png'
import {TRANSFORM_CENTER, TRANSFORM_TO_LEFT} from '../../utils/StyleHelper';
import {AbstractBlock} from '../abstractBlock';


const paramOptions = {
	x: 65,
	y: 34,
	fontSize: 12,
};

const operationParamOption = {
	x: 24,
	y: 15,
	fontSize: 12,
};

const pathParamOption = {
	x: 152,
	y: 6,
	fontSize: 14,
};

export class Select extends AbstractBlock {
	protected blockHeight = 46;

	protected param;
	protected operationParam;
	protected pathParam;


	constructor(params: string[], antV:boolean = false) {
		super(antV);
		this.operationParam = params[0];
		this.param          = params[1];
		this.pathParam      = (params[1] ? params[1].split(',')[5] : undefined);

		this.branching = [this.pathParam];
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
		paramBlock.style.transform = TRANSFORM_CENTER;
		paramBlock.contentEditable = String(true);

		gpssBlock.appendChild(paramBlock);

		const operationBlock     = document.createElement('p');
		operationBlock.innerText = this.operationParam;
		operationBlock.className = 'gpss-param';

		operationBlock.style.left      = operationParamOption.x + 'px';
		operationBlock.style.top       = operationParamOption.y + 'px';
		operationBlock.style.fontSize  = operationParamOption.fontSize + 'px';
		operationBlock.style.transform = TRANSFORM_TO_LEFT;
		operationBlock.contentEditable = String(true);

		gpssBlock.appendChild(operationBlock);

		if (!this.pathParam) {
			// imgEl.style.clipPath = 'inset(0 25px 0 -1px)';

			return gpssBlock;
		}

		const pathBlock     = document.createElement('p');
		pathBlock.innerText = this.pathParam;
		pathBlock.className = 'gpss-param';

		pathBlock.style.left      = pathParamOption.x + 'px';
		pathBlock.style.top       = pathParamOption.y + 'px';
		pathBlock.style.fontSize  = pathParamOption.fontSize + 'px';
		pathBlock.contentEditable = String(true);

		gpssBlock.appendChild(pathBlock);

		return gpssBlock;
	}
}