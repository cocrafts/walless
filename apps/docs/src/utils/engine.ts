import fs from 'fs';
import path from 'path';

import { type DocsTree } from './types';

export const loadMarkdown = async (markdownPath?: string) => {
	if (typeof markdownPath == 'undefined')
		markdownPath = path.join(process.cwd(), 'markdown');

	console.log(markdownPath);

	const pathNodes = markdownPath
		.split(path.sep + 'markdown')[1]
		.split(path.sep);

	const node: DocsTree = {
		name: pathNodes[pathNodes.length - 1]?.replace('.md', '') || 'root',
		path: pathNodes.join('/')?.replace('.md', '') || '/',
	};

	const stats = fs.statSync(markdownPath);
	if (stats.isDirectory()) {
		const childrenNames = fs.readdirSync(markdownPath);
		node.children = await Promise.all(
			childrenNames.map((name) =>
				loadMarkdown(path.join(markdownPath as string, name)),
			),
		);
	} else {
		node.content = fs.readFileSync(markdownPath, 'utf-8');
	}

	return node;
};

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
		if (child.name == nodes[0])
			return loadContent(child, path, nodes.splice(1));
	}
};
