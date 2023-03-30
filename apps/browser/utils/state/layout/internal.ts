import Router from 'next/router';
import { proxy } from 'valtio';

import { LayoutItem, LayoutProxy } from './type';

export const layoutProxy = proxy<LayoutProxy>({});

export const layoutActions = {
	add: (layout: LayoutItem) => {
		const { id } = layout;
		if (layoutProxy[id]) {
			return;
		}

		layoutProxy[id] = layout;
		Router.push(`/layout/${id}`);
	},

	remove: (id: string) => {
		if (!layoutProxy[id]) {
			return;
		}

		delete layoutProxy[id];
		Router.replace('/');
	},
};
