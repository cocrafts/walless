import fs from 'fs';
import path from 'path';

import { simplifyString } from './helpers';
import { type DocsTree } from './types';

export const loadMarkdown = async (markdownPath?: string) => {
	if (typeof markdownPath == 'undefined')
		markdownPath = path.join(process.cwd(), 'markdown');

	console.log(markdownPath);

	const pathNodes = markdownPath
		.split(path.sep + 'markdown')[1]
		.split(path.sep);

	const relativePath = pathNodes.join('/')?.replace('.md', '') || '/';

	const node: DocsTree = {
		name: pathNodes[pathNodes.length - 1]?.replace('.md', '') || 'root',
		path: simplifyString(relativePath),
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

const compareDocsTree = (a: DocsTree, b: DocsTree) => {
	if (!a.prefix && !b.prefix) return a.name > b.name ? 1 : -1;
	else if (!a.prefix) return 1;
	else if (!b.prefix) return -1;
	else {
		return a.prefix > b.prefix ? 1 : -1;
	}
};
