import type {
	CoinStruct,
	PaginatedCoins,
	SuiClient,
} from '@mysten/sui.js/client';
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
	const suiTokenDoc = {
		_id: `${owner}/token/${coin.coinType}`,
		type: 'Token',
		network: Networks.sui,
		cluster,
		name: metadata.name,
		symbol: metadata.symbol,
		image: metadata.image,
		balance: 0,
		decimals: metadata.decimals,
		coinObjectIds: [],
		coinType: coin.coinType,
		owner,
		lockedUntilEpoch: null,
		previousTransaction: coin.previousTransaction,
	} as TokenDocument<SuiToken>;
	coinObjects.forEach((coinObject) => {
		suiTokenDoc.balance += Number(coinObject.balance) / 10 ** metadata.decimals;
		suiTokenDoc.coinObjectIds.push(coinObject.coinObjectId);
	});
	return suiTokenDoc;
};

export const groupCoinByType = (coins: PaginatedCoins) => {
	const { data: coinObjects } = coins;
	return Object.groupBy(coinObjects, ({ coinType }) => coinType);
};
