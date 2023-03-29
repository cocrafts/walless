import { EncryptedWithPasscode } from '@walless/core';
import { decryptWithPasscode } from '@walless/crypto';
import { MessengerCallback } from '@walless/messaging';
import { signMessage } from '@walless/network/src/solana/transactions';
import { PrivateKeyRecord, PublicKeyRecord } from '@walless/storage';

import { db } from '../storage';

export const handleSignTransaction: MessengerCallback = async (payload) => {
	const publicKeys = await db.publicKeys.toArray();
	const solKey = publicKeys.find((i) => i.network === 'solana');
	const privateKeys = await db.privateKeys.toArray();
	const encrypted = privateKeys.find(
		(i) => i.id === (solKey as PublicKeyRecord).privateKeyId,
	);
	const solPrivateKey = await decryptWithPasscode(
		'123456',
		encrypted as EncryptedWithPasscode,
	);

	console.log(payload, solPrivateKey, '<--');
	// TODO: do something
};

export const handleSignAllTransaction: MessengerCallback = () => {
	// TODO: do something
};

export const handleSignMessage: MessengerCallback = async (
	payload,
	channel,
) => {
	let solPrivateKey;
	try {
		const publicKeys = await db.publicKeys.toArray();
		const solKey = publicKeys.find(
			(i) => i.network === 'solana',
		) as PublicKeyRecord;
		const privateKeys = await db.privateKeys.toArray();
		const encrypted = privateKeys.find((i) => i.id === solKey.privateKeyId);
		solPrivateKey = await decryptWithPasscode(
			'123456',
			encrypted as PrivateKeyRecord,
		);
	} catch (error) {
		console.log('Get private key error');
		console.log(error.message);
	}

	const message = new Uint8Array(Object.values(payload.message));
	const signature = signMessage(message, solPrivateKey);
	return signature;
};

global.handleSignMessage = handleSignMessage;
