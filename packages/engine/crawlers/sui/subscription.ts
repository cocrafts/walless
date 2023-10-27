import type { JsonRpcProvider } from '@mysten/sui.js';

import { collectibleActions } from '../../state/collectible';
import { tokenActions } from '../../state/token';

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
				tokenActions.updateBalance(
					`${owner}/${coin.coinType}`,
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

			collectibleActions.setCollectibles(collectibleDocs);
		}, 30000),
	);
};

export const suiTokenUnsubscribe = () => {
	suiSubscriptionPool.forEach((subscription) => clearInterval(subscription));
};
