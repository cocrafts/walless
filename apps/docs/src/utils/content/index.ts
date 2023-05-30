import { simplifyString } from 'utils/helpers';

import { type DocsTree } from '../types';

export const loadContent = (
	docsTree: DocsTree,
	path: string,
	nodes?: string[],
): string | undefined => {
	if (typeof nodes == 'undefined')
		nodes = path.split('/').filter((node) => node.length > 0);

	if (nodes.length == 0) return docsTree.content;
	else if (!docsTree.children) return;

	for (const child of docsTree.children) {
		if (simplifyString(child.name) == nodes[0])
			return loadContent(child, path, nodes.splice(1));
	}
};
