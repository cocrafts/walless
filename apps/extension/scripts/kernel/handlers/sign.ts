import { Keypair, VersionedTransaction } from '@solana/web3.js';
import { decryptWithPasscode } from '@walless/crypto';
import { MessengerCallback } from '@walless/messaging';
import { signMessage } from '@walless/network/src/solana/transactions';
import { PrivateKeyRecord, PublicKeyRecord } from '@walless/storage';

import { db } from '../storage';

export const handleSignTransaction: MessengerCallback = async (
	payload,
	channel,
) => {
	const priavteKey = await triggerActionToGetPrivateKey();
	if (!priavteKey) {
		return;
	}
	const serializedTransaction = new Uint8Array(
		Object.values(payload.transaction),
	);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);
	const keypair = Keypair.fromSecretKey(priavteKey);
	transaction.sign([keypair]);
	console.log(transaction);
	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		signedTransaction: transaction.serialize(),
	});
	return transaction.serialize();
};

export const handleSignAllTransaction: MessengerCallback = () => {
	// TODO: do something
};

export const handleSignMessage: MessengerCallback = async (
	payload,
	channel,
) => {
	const priavteKey = await triggerActionToGetPrivateKey();
	if (!priavteKey) {
		return;
	}
	const message = new Uint8Array(Object.values(payload.message));
	const signature = signMessage(message, priavteKey);

	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		signature: signature,
	});
	return signature;
};

const triggerActionToGetPrivateKey = async () => {
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

global.handleSignMessage = handleSignMessage;
