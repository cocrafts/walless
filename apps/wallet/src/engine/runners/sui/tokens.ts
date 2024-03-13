import type { CoinStruct, SuiClient } from '@mysten/sui.js/client';
import { SUI_DECIMALS } from '@mysten/sui.js/utils';
import type { NetworkCluster, SuiToken } from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import { getSUITokenMetadata } from './metadata';

export const constructSuiTokenDocument = async (
	client: SuiClient,
	cluster: NetworkCluster,
	owner: string,
	coin: CoinStruct,
): Promise<TokenDocument<SuiToken> | undefined> => {
	const metadata = await getSUITokenMetadata(client, coin);
	if (!metadata) return;

	return {
		_id: `${owner}/token/${coin.coinType}`,
		type: 'Token',
		network: Networks.sui,
		cluster,
		name: metadata.name,
		symbol: metadata.symbol,
		image: metadata.image,
		balance: Number(coin.balance) / 10 ** SUI_DECIMALS,
		coinObjectId: coin.coinObjectId,
		coinType: coin.coinType,
		owner,
	};
};
