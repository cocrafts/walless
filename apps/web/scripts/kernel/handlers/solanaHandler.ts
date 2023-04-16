import { Keypair, VersionedTransaction } from '@solana/web3.js';
import { Networks } from '@walless/core';
import {
	MessengerCallback,
	ResponseCode,
	ResponsePayload,
} from '@walless/messaging';
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
	const responsePayload: ResponsePayload = {
		from: 'walless@kernel',
		requestId: payload.requestId,
		responseCode: ResponseCode.SUCCESS,
	};

	if (settings.requirePasscode && !payload.passcode) {
		responsePayload.responseCode = ResponseCode.REQUIRE_PASSCODE;

		return channel.postMessage(responsePayload);
	}

	let privateKey;
	try {
		privateKey = await getPrivateKey(Networks.solana, payload.passcode);
	} catch (error) {
		responsePayload.responseCode = ResponseCode.WRONG_PASSCODE;
		responsePayload.message = (error as Error).message;

		return channel.postMessage(responsePayload);
	}

	const serializedTransaction = decode(payload.transaction);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);

	try {
		responsePayload.signatureString = await signAndSendTransaction(
			solanaConnection,
			transaction,
			payload.options || {},
			privateKey as Uint8Array,
		);
	} catch (error) {
		responsePayload.responseCode = ResponseCode.ERROR;
		responsePayload.message = (error as Error).message;
	}

	return channel.postMessage(responsePayload);
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
