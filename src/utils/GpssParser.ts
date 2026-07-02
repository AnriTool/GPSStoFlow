import {gpssBlocks} from './GpssBlocks';

export class GpssParser {
	static parse(text: string):Array<{type, params, label}> {
		const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
		const blocks = [];
		for (let line of lines) {
			line = line.split(';')[0].trim();

			if (!line) {
				continue
			}

			let tokens = this.tokenize(line);

			if (tokens.length === 0) {
				continue
			}

			let type     = (tokens[0] ? tokens[0].toUpperCase() : undefined);
			let postType = (tokens[1] ? tokens[1].toUpperCase() : undefined);
			let label    = undefined;

			if (!gpssBlocks[type] && gpssBlocks[postType]) {
				label = type;

				tokens = this.tokenize(line.replace(type + ' ',''));
				type   = postType;
			}
			else if (!gpssBlocks[type] && !gpssBlocks[postType]) {
				blocks.push({type:'TEXT', params: [line], label})

				continue;
			}

			const params = tokens.slice(1);
			blocks.push({type, params, label});
		}

		return blocks;
	}

	static tokenize(line) {
		return line.split(/\s+/);
	}
}
