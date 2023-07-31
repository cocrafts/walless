import { proxy } from 'valtio';
import { proxyMap } from 'valtio/utils';

import type { Transaction } from '../../solana/transaction';

interface HistoryState {
	map: Map<string, Transaction>;
}

export const historyState = proxy<HistoryState>({
	map: proxyMap(),
});
