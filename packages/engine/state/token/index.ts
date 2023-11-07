import type { TokenDocument } from '@walless/store';

import { tokenState } from './internal';

export const tokenActions = {
	setItems: (items: TokenDocument[]) => {
		for (const item of items) {
			tokenState.map.set(item._id, item);
		}
	},
};

export * from './internal';
