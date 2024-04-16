import type {
	CoinStruct,
	PaginatedCoins,
	SuiClient,
} from '@mysten/sui.js/client';
import { SUI_DECIMALS } from '@mysten/sui.js/utils';
import type { NetworkCluster, SuiToken } from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import { getSUITokenMetadata } from './metadata';

export const constructSuiTokenDocument = async (
	client: SuiClient,
	cluster: NetworkCluster,
	owner: string,
	coinObjects: CoinStruct[],
): Promise<TokenDocument<SuiToken> | undefined> => {
	const [coin] = coinObjects;
	const metadata = await getSUITokenMetadata(client, coin);
	if (!metadata) return;
	return coinObjects.reduce((tokenDoc, coinObject) => {
		if (Object.keys(tokenDoc).length === 0) {
			tokenDoc = {
				_id: `${owner}/token/${coinObject.coinType}`,
				type: 'Token',
				network: Networks.sui,
				cluster,
				name: metadata.name,
				symbol: metadata.symbol,
				image: metadata.image,
				balance: Number(coinObject.balance) / 10 ** SUI_DECIMALS,
				coinObjectIds: [coinObject.coinObjectId],
				coinType: coinObject.coinType,
				owner,
				lockedUntilEpoch: null,
				previousTransaction: coinObject.previousTransaction,
			};
		} else {
			tokenDoc.coinObjectIds.push(coinObject.coinObjectId);
			tokenDoc.balance += Number(coinObject.balance) / 10 ** SUI_DECIMALS;
		}

		return tokenDoc;
	}, {} as TokenDocument<SuiToken>);
};

export const groupCoinByType = (coins: PaginatedCoins) => {
	const { data: coinObjects } = coins;
	return coinObjects.reduce(
		(coinList, coinObject) => {
			if (!coinList[coinObject.coinType]) {
				coinList[coinObject.coinType] = [coinObject];
			} else {
				coinList[coinObject.coinType].push(coinObject);
			}

			return coinList;
		},
		{} as Record<string, CoinStruct[]>,
	);
};
