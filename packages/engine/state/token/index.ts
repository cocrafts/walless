import { modules } from '@walless/ioc';
import type { TokenDocument } from '@walless/store';

import { tokenState } from './internal';

export const tokenActions = {
	setItems: (items: TokenDocument[]) => {
		for (const item of items) {
			tokenState.map.set(item._id, item);
		}
	},
	setTokens: async (tokens: TokenDocument[]) => {
		for (const token of tokens) {
			await modules.storage.upsert<TokenDocument>(token._id, async () => token);
		}
	},
	updateBalance: async (id: string, balance: string) => {
		const token = tokenState.map.get(id);

		if (!token) return false;

		const result = await modules.storage.upsert<TokenDocument>(
			id,
			async (prevDoc) => {
				prevDoc.account.balance = balance;

				return prevDoc;
			},
		);

		return result.ok;
	},
};

export * from './internal';
