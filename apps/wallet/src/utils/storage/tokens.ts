import type { TokenDocument } from '@walless/store';

import { storage } from './db';

const getTokenByIdFromStorage = async (
	id: string,
): Promise<TokenDocument | undefined> => {
	return await storage.safeGet(id);
};

const addTokensToStorage = async (tokens: TokenDocument[]) => {
	return await Promise.all(
		tokens.map((t) => {
			return addTokenToStorage(t);
		}),
	);
};

const addTokenToStorage = async (token: TokenDocument) => {
	return await storage.upsert<TokenDocument>(token._id, async () => token);
};

const updateTokenBalanceToStorage = async (id: string, balance: string) => {
	return await storage.upsert<TokenDocument>(id, async (prevDoc) => {
		prevDoc.account.balance = balance;

		return prevDoc;
	});
};

export {
	addTokensToStorage,
	addTokenToStorage,
	getTokenByIdFromStorage,
	updateTokenBalanceToStorage,
};
