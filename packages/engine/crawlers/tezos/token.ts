import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import type { TezosContext } from './shared';
import { tezosEndpoints } from './shared';

export const getTokenDocument = async (
	context: TezosContext,
	token: Partial<TokenDocument>,
	address: string,
): Promise<TokenDocument> => {
	const { connection, endpoint } = context;
	const isNativeToken = token._id === 'tezos-native-token';
	const balance = isNativeToken
		? (await connection.tz.getBalance(address)).toNumber().toString()
		: '0';
	let tokenId = token.account?.address || '';
	if (endpoint === tezosEndpoints.ghostnetTestnet) {
		tokenId += `_${token.account?.tokenId}`;
	}

	return {
		...token,
		_id: `${address}/token/${tokenId}`,
		type: 'Token',
		account: {
			...token.account,
			mint: tokenId,
			balance,
		} as never,
		network: Networks.tezos,
	};
};
