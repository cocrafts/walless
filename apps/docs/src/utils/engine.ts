import fs from 'fs';
import path from 'path';

import { simplifyString } from './helpers';
import type { DocsTree } from './types';

export const loadMarkdown = async (
	markdownPath?: string,
	simplifiedParentPath?: string,
	_parent?: DocsTree,
) => {
	if (typeof markdownPath == 'undefined')
		markdownPath = path.join(process.cwd(), 'markdown');

	const pathNodes = markdownPath
		.split(path.sep + 'markdown')[1]
		.split(path.sep);

	const fileName = pathNodes[pathNodes.length - 1]?.replace('.md', '');

	const isRoot = !fileName;

	const node: DocsTree = {
		name: isRoot ? 'root' : fileName,
		path: isRoot ? '/' : `${simplifiedParentPath}/${simplifyString(fileName)}`,
	};

	const lastDotIdx = fileName.lastIndexOf('.');
	if (lastDotIdx !== -1) {
		node.prefix = fileName.slice(0, lastDotIdx);
		node.name = fileName.slice(lastDotIdx + 1);
		node.path = `${simplifiedParentPath}/${simplifyString(node.name)}`;
	}

	const stats = fs.statSync(markdownPath);
	if (stats.isDirectory()) {
		const childrenNames = fs.readdirSync(markdownPath);
		const children = await Promise.all(
			childrenNames.map((name) =>
				loadMarkdown(
					path.join(markdownPath as string, name),
					isRoot ? '' : node.path,
					node,
				),
			),
		);
		node.children = children.flatMap((child) => (child ? child : []));
		node.children.sort(compareDocsTree);
	} else {
		if (fileName == 'index' && _parent) {
			_parent.content = fs.readFileSync(markdownPath, 'utf-8');
			return;
		} else node.content = fs.readFileSync(markdownPath, 'utf-8');
	}

	return node;
};

const compareDocsTree = (a: DocsTree, b: DocsTree) => {
	if (!a.prefix && !b.prefix) return a.name > b.name ? 1 : -1;
	else if (!a.prefix) return 1;
	else if (!b.prefix) return -1;
	else {
		return a.prefix > b.prefix ? 1 : -1;
	}
};
