import { modules } from '@walless/ioc';
import type { TokenDocument } from '@walless/store';

const getTokenByIdFromStorage = async (
	id: string,
): Promise<TokenDocument | undefined> => {
	return await modules.storage.safeGet(id);
};

const addTokensToStorage = (tokens: TokenDocument[]) => {
	const tokenPromises: Promise<unknown>[] = [];

	for (const token of tokens) {
		tokenPromises.push(modules.storage.upsert(token._id, async () => token));
	}

	Promise.all(tokenPromises);
};

const updateTokenBalanceToStorage = async (
	id: string,
	balance: string,
): Promise<boolean> => {
	const token = await getTokenByIdFromStorage(id);

	if (!token) return false;

	const result = await modules.storage.upsert<TokenDocument>(
		id,
		async (prevDoc) => {
			prevDoc.account.balance = balance;

			return prevDoc;
		},
	);

	return result.ok;
};

const removeTokenFromStorage = async (id: string) => {
	await modules.storage.removeDoc(id);
};

export {
	addTokensToStorage,
	getTokenByIdFromStorage,
	removeTokenFromStorage,
	updateTokenBalanceToStorage,
};
