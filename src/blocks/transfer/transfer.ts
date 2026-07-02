import image from './image.png'
import imageNoArrow from  './imageNoArrow.png'
import {TRANSFORM_CENTER, TRANSFORM_TO_LEFT} from '../../utils/StyleHelper';
import {AbstractBlock} from '../abstractBlock';

const chanceParamOptions = {
	x: 63,
	y: 47,
	fontSize: 14
};

const pathRightParamOptions = {
	x: 126,
	y: 23,
	fontSize: 14
};

const pathBottomParamOptions = {
	x: 59,
	y: 84,
	fontSize: 14
};

export class Transfer extends AbstractBlock {
	protected blockHeight = 85;

	protected chanceParam;
	protected path1Param;
	protected path2Param;

	constructor(params: string[], antV:boolean = false) {
		super(antV);
		[this.chanceParam, this.path1Param, this.path2Param] = params[0].split(',');

		this.branching = [this.path1Param, this.path2Param];
	}

	public getHtml():HTMLElement {
		const gpssBlock     = document.createElement('div');
		gpssBlock.className = 'gpss-block';

		const imgEl = document.createElement("img")
		imgEl.src   = <string>(this.antV ? imageNoArrow : image);
		gpssBlock.appendChild((imgEl));

		const chanceParamBlock     = document.createElement('p');
		chanceParamBlock.innerText = this.chanceParam;
		chanceParamBlock.className = 'gpss-param';

		chanceParamBlock.style.left      = chanceParamOptions.x + 'px';
		chanceParamBlock.style.top       = chanceParamOptions.y + 'px';
		chanceParamBlock.style.fontSize  = chanceParamOptions.fontSize + 'px';
		chanceParamBlock.style.transform = TRANSFORM_CENTER;
		chanceParamBlock.contentEditable = String(true);

		gpssBlock.appendChild(chanceParamBlock);

		if (!this.path2Param) {
			const pathRightParamBlock     = document.createElement('p');
			pathRightParamBlock.innerText = this.path1Param;
			pathRightParamBlock.className = 'gpss-param';

			pathRightParamBlock.style.left      = pathRightParamOptions.x + 'px';
			pathRightParamBlock.style.top       = pathRightParamOptions.y + 'px';
			pathRightParamBlock.style.fontSize  = pathRightParamOptions.fontSize + 'px';
			pathRightParamBlock.contentEditable = String(true);

			gpssBlock.appendChild(pathRightParamBlock);

			// imgEl.style.clipPath = 'inset(-1px 0 25px 0)';

			return gpssBlock;
		}

		const pathRightParamBlock     = document.createElement('p');
		pathRightParamBlock.innerText = this.path2Param;
		pathRightParamBlock.className = 'gpss-param';

		pathRightParamBlock.style.left      = pathRightParamOptions.x + 'px';
		pathRightParamBlock.style.top       = pathRightParamOptions.y + 'px';
		pathRightParamBlock.style.fontSize  = pathRightParamOptions.fontSize + 'px';
		pathRightParamBlock.contentEditable = String(true);

		gpssBlock.appendChild(pathRightParamBlock);

		const pathBottomBlock     = document.createElement('p');
		pathBottomBlock.innerText = this.path1Param;
		pathBottomBlock.className = 'gpss-param';

		pathBottomBlock.style.left      = pathBottomParamOptions.x + 'px';
		pathBottomBlock.style.top       = pathBottomParamOptions.y + 'px';
		pathBottomBlock.style.fontSize  = pathBottomParamOptions.fontSize + 'px';
		pathBottomBlock.style.transform = TRANSFORM_TO_LEFT;
		pathBottomBlock.contentEditable = String(true);

		gpssBlock.appendChild(pathBottomBlock);

		return gpssBlock;
	}
}