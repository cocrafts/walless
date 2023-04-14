import { decryptWithPasscode } from '@walless/crypto';
import { PrivateKeyRecord, PublicKeyRecord } from '@walless/storage';

import { db } from '../storage';

export const triggerActionToGetPrivateKey = async () => {
	try {
		const publicKeys = await db.publicKeys.toArray();
		const solKey = publicKeys.find(
			(i) => i.network === 'solana',
		) as PublicKeyRecord;
		const privateKeys = await db.privateKeys.toArray();
		const encrypted = privateKeys.find((i) => i.id === solKey.privateKeyId);
		return await decryptWithPasscode('123456', encrypted as PrivateKeyRecord);
	} catch (error) {
		console.log('Get private key error');
		console.log(error.message);
		return null;
	}
};
