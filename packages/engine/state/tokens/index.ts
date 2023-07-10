import { type TokenDocument } from '@walless/store';

import { tokenState } from './internal';

export const tokenActions = {
	setItems: (items: TokenDocument[]) => {
		for (const item of items) {
			tokenState.map.set(item._id, item);
		}
	},
	updateBalance: (owner: string, mint: string, balance: string) => {
		const token = tokenState.map.get(`${owner}/${mint}`);
		if (token) token.account.balance = balance;
	},
};

export * from './internal';
