import type { PublicKeyDocument } from '@walless/store';

import { keyState } from './internal';

export const keyActions = {
	setItems: (items: PublicKeyDocument[]) => {
		for (const item of items) {
			keyState.map.set(item._id, item);
		}
	},
};

export * from './internal';
