import type { TokenDocument } from '@walless/store';

import { tokenState } from './internal';

export const tokenActions = {
	setItems: (items: TokenDocument[]) => {
		for (const item of items) {
			tokenState.map.set(item._id, item);
		}
	},
	updateBalance: (id: string, balance: string) => {
		const token = tokenState.map.get(id);
		if (token) {
			token.account.balance = balance;
			return true;
		}
		return false;
	},
};

export * from './internal';
