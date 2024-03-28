import type { HistoryDocument } from '@walless/store';
import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

interface HistoryState {
	map: Map<string, HistoryDocument>;
}

export const historyState = proxy<HistoryState>({
	map: proxyMap(),
});

export const historyActions = {
	setItems: async (items: (HistoryDocument | null)[]) => {
		items.forEach((item) => {
			if (item) historyState.map.set(item.signature, item);
		});
	},
	setItem: (item: HistoryDocument) => {
		historyState.map.set(item.signature, item);
	},
	getItems: () => {
		const history = Array.from(historyState.map.values());
		return history;
	},
};
