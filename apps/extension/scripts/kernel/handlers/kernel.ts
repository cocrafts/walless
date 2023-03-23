import { MessengerCallback } from '@walless/messaging';

import { db } from '../storage';
import { fetchAllCollectibles, fetchAllTokens } from '../utils/query';

export const onKernelMessage: MessengerCallback = async (payload, channel) => {
	if (payload.requestId) {
		if (payload.type === 'request-connect') {
			const publicKeys = await db.publicKeys.toArray();
			const solKey = publicKeys.find((i) => i.network === 'solana');

			console.log('send back response:', solKey.id);
			channel.postMessage({
				from: 'walless@kernel',
				requestId: payload.requestId,
				publicKey: solKey.id,
			});
		}
	} else {
		if (payload.type === 'notify-wallet-open') {
			const { collectibles, collections } = await fetchAllCollectibles();

			console.log(collectibles, 'collectibles');
			console.log(collections, 'collections');

			const wallets = await fetchAllTokens();
			console.log(wallets, 'wallets');
		}
	}
};
