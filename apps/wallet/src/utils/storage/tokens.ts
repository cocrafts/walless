import type { TokenDocument } from '@walless/store';

import { storage } from './db';

const getTokenByIdFromStorage = async (
	id: string,
): Promise<TokenDocument | undefined> => {
	return await storage.safeGet(id);
};

const addTokensToStorage = (tokens: TokenDocument[]) => {
	const tokenPromises: Promise<unknown>[] = [];

	for (const token of tokens) {
		tokenPromises.push(storage.upsert(token._id, async () => token));
	}

	Promise.all(tokenPromises);
};

const updateTokenBalanceToStorage = async (
	id: string,
	balance: string,
): Promise<boolean> => {
	const token = await getTokenByIdFromStorage(id);

	if (!token) return false;

	const result = await storage.upsert<TokenDocument>(id, async (prevDoc) => {
		prevDoc.account.balance = balance;

		return prevDoc;
	});

	return result.ok;
};

const removeTokenFromStorage = async (id: string) => {
	await storage.removeDoc(id);
};

export {
	addTokensToStorage,
	getTokenByIdFromStorage,
	removeTokenFromStorage,
	updateTokenBalanceToStorage,
};
