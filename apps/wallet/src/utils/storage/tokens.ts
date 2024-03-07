import type { TokenV2 } from '@walless/core';
import type { TokenDocumentV2 } from '@walless/store';

import { storage } from './db';

const getTokenByIdFromStorage = async (
	id: string,
): Promise<TokenDocumentV2 | undefined> => {
	return await storage.safeGet(id);
};

const addTokensToStorage = async <T extends TokenV2 = TokenV2>(
	tokens: TokenDocumentV2<T>[],
) => {
	return await Promise.all(
		tokens.map((t) => {
			return addTokenToStorage(t);
		}),
	);
};

const addTokenToStorage = async <T extends TokenV2 = TokenV2>(
	token: TokenDocumentV2<T>,
) => {
	return await storage.upsert<T>(token._id, async () => token);
};

export { addTokensToStorage, addTokenToStorage, getTokenByIdFromStorage };
