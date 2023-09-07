import type { JsonRpcProvider } from '@mysten/sui.js';

import { tokenActions } from '../../state/token';

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

export const suiTokenUnsubscribe = () => {
	suiSubscriptionPool.forEach((subscription) => clearInterval(subscription));
};
