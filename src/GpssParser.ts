import KnownFuncs from './gpss-funcs.json';

export class GpssParser {
	/**
	 *
	 */
	static parse(text: string) {
		const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
		const blocks = [];
		for (let line of lines) {
			// Убираем комментарии (после ;)
			line = line.split(';')[0].trim();

			if (!line) {
				continue
			}

			// Разбиваем на токены: учитываем кавычки и скобки
			let tokens = this.tokenize(line);
			if (tokens.length === 0) {
				continue
			}

			let type = tokens[0].toUpperCase();

			if (!(KnownFuncs as string[]).includes(type)) {
				blocks.push({type:'LABEL', params: [tokens[0]], raw: line})

				// Разбиваем на токены: учитываем кавычки и скобки
				tokens = this.tokenize(line.replace(tokens[0] + ' ',''));

				if (tokens.length === 0) {
					continue
				}

				type = tokens[0].toUpperCase();
			}


			const params = tokens.slice(1);
			blocks.push({ type, params, raw: line });
		}
		return blocks;
	}

	static tokenize(line) {
		// Простая версия: разбиваем по пробелам, но с учётом скобок и кавычек
		// Для реального проекта лучше использовать регулярное выражение
		return line.split(/\s+/);
	}
}
