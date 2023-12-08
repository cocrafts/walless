import type { Token } from '@walless/core';
import { logger, Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import type { TezosContext } from './shared';
export const getNativeTokenDocument = async (
	{ connection }: TezosContext,
	address: string,
): Promise<TokenDocument> => {
	let balance = '0';
	try {
		balance = (await connection.tz.getBalance(address)).toNumber().toString();
	} catch (e) {
		logger.error('Tezos get balance for native token error', e);
	}

	return {
		_id: `${address}/token/tezos-native-token`,
		network: Networks.tezos,
		type: 'Token',
		metadata: {
			name: 'Tezos',
			symbol: 'TEZ',
			imageUri: '/img/network/tezos-icon-sm.png',
		},
		account: {
			address: 'tezos-native-token',
			balance,
			decimals: 6,
		},
	};
};

export const getTokenDocument = async (
	context: TezosContext,
	token: Omit<Token, 'network'>,
	address: string,
): Promise<TokenDocument> => {
	const tokenAddress = token.account.address;

	return {
		...token,
		_id: `${address}/token/${tokenAddress}/${token.account?.tokenId}`,
		type: 'Token',
		account: {
			...token.account,
			mint: tokenAddress,
			balance: '0',
		} as never,
		network: Networks.tezos,
	};
};
