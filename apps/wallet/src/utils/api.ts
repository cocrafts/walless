import type { TokenInfo } from '@walless/graphql';
import { queries } from '@walless/graphql';
import type { TokenDocument } from '@walless/store';

import { qlClient } from './graphql';

export const makeHashId = (i: TokenDocument) => {
	return `${i.network}#${i.account.mint}`;
};

export const getTokenQuotes = async (
	docs: TokenDocument[],
): Promise<Record<string, TokenInfo>> => {
	const addresses = docs.map(makeHashId);
	const result: Record<string, TokenInfo> = {};
	const response = await qlClient.request<
		{ tokensByAddress: TokenInfo[] },
		{ addresses: string[] }
	>(queries.tokensByAddress, { addresses });

	for (const item of response.tokensByAddress || []) {
		result[item.address as string] = item;
	}

	return result;
};
