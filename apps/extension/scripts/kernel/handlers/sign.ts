import { Keypair, VersionedTransaction } from '@solana/web3.js';
import { decryptWithPasscode } from '@walless/crypto';
import { MessengerCallback } from '@walless/messaging';
import { signAndSendTransaction, signMessage } from '@walless/network';
import { PrivateKeyRecord, PublicKeyRecord } from '@walless/storage';
import { decode, encode } from 'bs58';

import { db } from '../storage';
import { connection } from '../utils/connection';

export const handleSignTransaction: MessengerCallback = async (
	payload,
	channel,
) => {
	const privateKey = await triggerActionToGetPrivateKey();
	if (!privateKey) {
		return;
	}
	const serializedTransaction = decode(payload.transaction);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);
	const keypair = Keypair.fromSecretKey(privateKey);
	transaction.sign([keypair]);
	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		signedTransaction: encode(transaction.serialize()),
	});
	return transaction.serialize();
};

export const handleSignAndSendTransaction: MessengerCallback = async (
	payload,
	channel,
) => {
	// Prepare private key
	const privateKey = await triggerActionToGetPrivateKey();
	if (!privateKey) {
		return;
	}

	console.log('handleSignAndSendTransaction');
	console.log(payload.transaction);

	// Transaction object
	const serializedTransaction = decode(payload.transaction);
	console.log(serializedTransaction);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);

	const sinatureString = await signAndSendTransaction(
		connection,
		transaction,
		payload.options || {},
		privateKey,
	);

	console.log(sinatureString);

	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		sinatureString,
	});
	return sinatureString;
};

export const handleSignAllTransaction: MessengerCallback = () => {
	// TODO: do something
};

export const handleSignMessage: MessengerCallback = async (
	payload,
	channel,
) => {
	const privateKey = await triggerActionToGetPrivateKey();
	if (!privateKey) {
		return;
	}
	const message = decode(payload.message);
	const signature = signMessage(message, privateKey);

	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		signature: encode(signature),
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
