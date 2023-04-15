import { Keypair, VersionedTransaction } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { MessengerCallback, ResponseCode } from '@walless/messaging';
import { signAndSendTransaction, signMessage } from '@walless/network';
import { decode, encode } from 'bs58';

import { solanaConnection } from '../utils/connection';
import { triggerActionToGetPrivateKey } from '../utils/handler';

import { getPrivateKey, settings } from './../utils/handler';

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
	const messageHeader = {
		from: 'walless@kernel',
		requestId: payload.requestId,
	};

	if (settings.requirePasscode && !payload.passcode) {
		return channel.postMessage({
			...messageHeader,
			responseCode: ResponseCode.REQUIRE_PASSCODE,
		});
	}

	// Prepare private key
	let privateKey;
	try {
		privateKey = await getPrivateKey(Networks.solana, payload.passcode);
	} catch (error) {
		return channel.postMessage({
			...messageHeader,
			responseCode: ResponseCode.WRONG_PASSCODE,
			message: (error as Error).message,
		});
	}

	// Transaction object
	const serializedTransaction = decode(payload.transaction);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);

	const signatureString = await signAndSendTransaction(
		solanaConnection,
		transaction,
		payload.options || {},
		privateKey as Uint8Array,
	);

	return channel.postMessage({
		...messageHeader,
		responseCode: ResponseCode.SUCCESS,
		signatureString,
	});
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
