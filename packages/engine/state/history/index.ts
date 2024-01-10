import type { Transaction } from '../../crawlers/solana/history';

import { historyState } from './internal';

export const historyActions = {
	setItems: async (items: (Transaction | null)[]) => {
		items.forEach((item) => {
			if (item) historyState.map.set(item.signature, item);
		});
	},
	setItem: (item: Transaction) => {
		historyState.map.set(item.signature, item);
	},
	getItems: () => {
		const history = Array.from(historyState.map.values());
		return history;
	},
};

export * from './internal';
