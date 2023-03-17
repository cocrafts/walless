import { MessengerCallback } from '@walless/messaging';

import { db } from '../storage';

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
		console.log('pure notify', payload);
	}
};
