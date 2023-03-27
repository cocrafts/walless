import { MessengerCallback } from '@walless/messaging';

import { db } from '../storage';

export const handleConnect: MessengerCallback = async (payload, channel) => {
	const publicKeys = await db.publicKeys.toArray();
	const solKey = publicKeys.find((i) => i.network === 'solana');

	console.log('send back response:', solKey.id);
	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		publicKey: solKey.id,
	});
};
