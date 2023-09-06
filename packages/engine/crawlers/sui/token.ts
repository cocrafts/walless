import type { SuiObjectData } from '@mysten/sui.js';
import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import { getMetadata } from './metadata';
import type { ICoin, SuiContext } from './shared';

export const getTokenDocument = async (
	context: SuiContext,
	owner: string,
	coin: ICoin,
	object: SuiObjectData,
): Promise<TokenDocument> => {
	const { endpoint } = context;

	return {
		_id: `${owner}/${coin.coinType}`,
		type: 'Token',
		network: Networks.sui,
		endpoint,
		account: {
			mint: coin.coinType,
			address: endpoint,
			balance: coin.balance,
			decimals: 9,
		},
		metadata: await getMetadata(context, object),
	};
};
