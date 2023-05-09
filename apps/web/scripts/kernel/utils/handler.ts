import { Networks } from '@walless/core';
import { decryptWithPasscode } from '@walless/crypto';
import { PrivateKeyRecord } from '@walless/storage';
import { PrivateKeyDocument, PublicKeyDocument } from '@walless/store';
import { db } from 'utils/pouch';

export const settings = {
	requirePasscode: true,
};

export const triggerActionToGetPrivateKey = async () => {
	try {
		const publicKey = await db.publicKeys.get({ network: Networks.solana });

		const encryptedKey = await db.privateKeys.get({
			id: publicKey?.privateKeyId,
		});

		return await decryptWithPasscode(
			'123456',
			encryptedKey as PrivateKeyRecord,
		);
	} catch (error) {
		console.log('Get private key error');
		console.log((error as Error).message);
		return null;
	}
};

export const getPrivateKey = async (network: Networks, passcode: string) => {
	const result = await db.find({
		selector: {
			type: 'PublicKey',
			network: network,
		},
	});

	const publicKey = result.docs as PublicKeyDocument[];

	const encryptedKey = (await db.get(
		publicKey[0].privateKeyId,
	)) as PrivateKeyDocument;

	return await decryptWithPasscode(passcode, encryptedKey);
};
