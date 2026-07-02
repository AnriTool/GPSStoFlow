export const HTML_NODE_NAME = 'gpss-html-node'

export function getGraphConfig(container) {
	return {
		connecting: undefined,
		container: container,
		autoResize: true,
		grid: {
			visible: true,
			type: 'doubleMesh',
		},
		panning: {
			enabled: true,
		},
		mousewheel: {
			enabled: true,
		}
	}
}

export function getCustomHtmlNodeConfig() {
	return {
		shape: HTML_NODE_NAME, // Имя вашего кастомного узла
		html(cell) {
			const {html} = cell.getData();

			return html;
		},
	}
}

export function getNode(offset: number, htmlBlock: HTMLElement) {
	return {
		x: 300,
		y: offset,
		shape: HTML_NODE_NAME,
		data: {html: htmlBlock}
	}
}

export function getDefaultEdge(nodeFrom, nodeTo, fromHeight) {
	return {
		source: {
			cell: nodeFrom,
			anchor: {
				name: 'bottom',
				args: {
					dx: 64,  // смещение по X
					dy: fromHeight   // смещение по Y
				}
			}
		},
		target: {
			cell: nodeTo,
			anchor: {
				name: 'top',
				args: {
					dx: 64,
					dy: 0
				}
			}
		},
		tools: ['segments'],
		router: 'orth',
	}
}

export function getTransferEdge(nodeFrom, nodeTo) {
	return {
		source: {
			cell: nodeFrom,
			anchor: {
				name: 'bottom',
				args: {
					dx: 122,  // смещение по X
					dy: 43   // смещение по Y
				}
			}
		},
		target: {
			cell: nodeTo,
			anchor: {
				name: 'top',
				args: {
					dx: 64,
					dy: 0
				}
			}
		},
		tools: ['segments'],
		router: 'orth',
	}
}

export function getSelectEdge(nodeFrom, nodeTo) {
	return {
		source: {
			cell: nodeFrom,
			anchor: {
				name: 'bottom',
				args: {
					dx: 148,  // смещение по X
					dy: 21   // смещение по Y
				}
			}
		},
		target: {
			cell: nodeTo,
			anchor: {
				name: 'top',
				args: {
					dx: 64,
					dy: 0
				}
			}
		},
		tools: ['segments'],
		router: 'orth',
	}
}
