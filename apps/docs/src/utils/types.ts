export type DocsTree = {
	name: string;
	path: string;
	content?: string;
	children?: DocsTree[];
	prefix?: string;
};
