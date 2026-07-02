export abstract class AbstractBlock {
	protected blockHeight: number;
	protected branching = [];
	protected antV = false;
	public abstract getHtml():HTMLElement;

	protected constructor(antV: boolean = false) {
		this.antV = antV
	}


	public getHeight(): number {
		return this.blockHeight
	};

	public getBranching(): string[] {
		return this.branching
	};
}