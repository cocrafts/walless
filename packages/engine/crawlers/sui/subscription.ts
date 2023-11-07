import type { JsonRpcProvider } from '@mysten/sui.js';

import { setCollectible } from '../../utils/collectibles';
import { updateTokenBalance } from '../../utils/token';

import { getSuiCollectibles } from './collectibles';

const suiSubscriptionPool: NodeJS.Timer[] = [];

export const suiTokenSubscribe = (
	connection: JsonRpcProvider,
	owner: string,
) => {
	suiSubscriptionPool.push(
		setInterval(async () => {
			const coinsBalance = await connection.getAllBalances({ owner });

			coinsBalance.forEach((coin) => {
				updateTokenBalance(
					`${owner}/token/${coin.coinType}`,
					coin.totalBalance,
				);
			});
		}, 5000),
	);
};

export const suiCollectibleSubscribe = async (
	connection: JsonRpcProvider,
	owner: string,
) => {
	suiSubscriptionPool.push(
		setInterval(async () => {
			const collectibleDocs = await getSuiCollectibles(connection, owner);

			collectibleDocs.forEach((collectible) =>
				setCollectible(collectible._id, collectible),
			);
		}, 30000),
	);
};

export const suiTokenUnsubscribe = () => {
	suiSubscriptionPool.forEach((subscription) => clearInterval(subscription));
};
