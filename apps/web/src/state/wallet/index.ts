import { PublicKeyDocument } from '@walless/store';

import { walletState } from './internal';

export const walletActions = {
	setItems: (items: PublicKeyDocument[]) => {
		for (const item of items) {
			walletState.map.set(item._id, item);
		}
	},
};

export * from './internal';
