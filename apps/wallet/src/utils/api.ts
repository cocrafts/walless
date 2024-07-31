import type { TokenInfo } from '@walless/graphql';
import { queries } from '@walless/graphql';

import { qlClient } from './graphql';

type IToken = {
	address: string;
	network: string;
};

export const makeHashId = (i: IToken) => {
	return `${i.network}#${i.address}`;
};

export const getTokenQuotes = async (
	tokens: IToken[],
): Promise<Record<string, TokenInfo>> => {
	const addresses = tokens.map(makeHashId);
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

export const getTokenQuote = async (token: IToken) => {
	try {
		const response = await qlClient.request<
			{ tokenByAddress: TokenInfo },
			{ address: string }
		>(queries.tokenByAddress, { address: makeHashId(token) });

		return response.tokenByAddress;
	} catch (error) {
		console.log('failed to get token quote:', error);
	}
};
