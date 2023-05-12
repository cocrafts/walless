import { Keypair, VersionedTransaction } from '@solana/web3.js';
import { Networks } from '@walless/core';
import {
	type MessengerCallback,
	type ResponsePayload,
	ResponseCode,
} from '@walless/messaging';
import { signAndSendTransaction, signMessage } from '@walless/network';
import { decode, encode } from 'bs58';
import modules from 'utils/modules';

import {
	getPrivateKey,
	settings,
	triggerActionToGetPrivateKey,
} from '../utils/handler';

export const handleSignTransaction: MessengerCallback = async (
	payload,
	channel,
) => {
	const privateKey = await triggerActionToGetPrivateKey();

	if (!privateKey) {
		return;
	}

	const serializedTransaction = decode(payload.transaction as string);
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
		privateKey = await getPrivateKey(
			Networks.solana,
			payload.passcode as string,
		);
	} catch (error) {
		responsePayload.responseCode = ResponseCode.WRONG_PASSCODE;
		responsePayload.message = (error as Error).message;

		return channel.postMessage(responsePayload);
	}

	const serializedTransaction = decode(payload.transaction as string);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);

	try {
		responsePayload.signatureString = await signAndSendTransaction(
			modules.engine.getConnection(Networks.solana),
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
