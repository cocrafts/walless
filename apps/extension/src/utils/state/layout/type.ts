export type LayoutItem = {
	id: string;
	projectLayout: React.FC;
};

export type LayoutProxy = Record<string, LayoutItem>;
