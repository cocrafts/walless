import type { Token } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import { storage } from './db';

const getTokenByIdFromStorage = async (
	id: string,
): Promise<TokenDocument | undefined> => {
	return await storage.safeGet(id);
};

const addTokensToStorage = async <T extends Token = Token>(
	tokens: TokenDocument<T>[],
) => {
	return await Promise.all(
		tokens.map((t) => {
			return addTokenToStorage(t);
		}),
	);
};

const addTokenToStorage = async <T extends Token = Token>(
	token: TokenDocument<T>,
) => {
	return await storage.upsert<T>(token._id, async () => token);
};

export { addTokensToStorage, addTokenToStorage, getTokenByIdFromStorage };
