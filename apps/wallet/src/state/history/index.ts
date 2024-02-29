import type { TransactionHistory } from '@walless/core';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

interface HistoryState {
	map: Map<string, TransactionHistory>;
}

export const historyState = proxy<HistoryState>({
	map: proxyMap(),
});

export const historyActions = {
	setItems: async (items: (TransactionHistory | null)[]) => {
		items.forEach((item) => {
			if (item) historyState.map.set(item.signature, item);
		});
	},
	setItem: (item: TransactionHistory) => {
		historyState.map.set(item.signature, item);
	},
	getItems: () => {
		const history = Array.from(historyState.map.values());
		return history;
	},
};
