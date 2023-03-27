import { decryptWithPasscode } from '@walless/crypto';
import { MessengerCallback } from '@walless/messaging';

import { db } from '../storage';

export const handleSignTransaction: MessengerCallback = async (payload) => {
	const publicKeys = await db.publicKeys.toArray();
	const solKey = publicKeys.find((i) => i.network === 'solana');
	const privateKeys = await db.privateKeys.toArray();
	const encrypted = privateKeys.find((i) => i.id === solKey.privateKeyId);
	const solPrivateKey = await decryptWithPasscode('123456', encrypted);

	console.log(payload, solPrivateKey, '<--');
	// TODO: do something
};

export const handleSignAllTransaction: MessengerCallback = () => {
	// TODO: do something
};
