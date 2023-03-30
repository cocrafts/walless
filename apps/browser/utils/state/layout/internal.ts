import Router from 'next/router';
import { proxy } from 'valtio';

import { generateHash } from './helper';
import { LayoutItem, LayoutProxy } from './type';

export const layoutProxy = proxy<LayoutProxy>({});

export const layoutActions = {
	add: (layout: LayoutItem) => {
		const layoutHash = generateHash(layout.id);

		if (layoutProxy[layoutHash]) {
			return;
		}

		layoutProxy[layoutHash] = layout;
		Router.push(`/layout/${layoutHash}`);
	},

	remove: (id: string) => {
		const layoutHash = generateHash(id);

		if (!layoutProxy[layoutHash]) {
			return;
		}

		delete layoutProxy[layoutHash];
		Router.replace('/');
	},
};
