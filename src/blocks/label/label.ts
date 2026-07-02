import {AbstractBlock} from '../abstractBlock';

const paramOptions = {
	fontSize: 14,
	padding: 16,
};

export class Label extends AbstractBlock {
	protected blockHeight = 20;

	protected params;

	constructor(params: string[], antV:boolean = false) {
		super(antV);
		[this.params] = params;
	}

	public getHtml():HTMLElement {
		const gpssBlock     = document.createElement('div');
		gpssBlock.className = 'gpss-block';

		gpssBlock.innerText           = this.params;
		gpssBlock.style.fontSize      = paramOptions.fontSize + 'px';
		gpssBlock.style.paddingBottom = paramOptions.padding + 'px';
		gpssBlock.contentEditable     = 'true';

		return gpssBlock;
	}
}