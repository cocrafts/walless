import { Ed25519Keypair, RawSigner, TransactionBlock } from '@mysten/sui.js';
import { Networks } from '@walless/core';
import {
	MessengerCallback,
	ResponseCode,
	ResponsePayload,
} from '@walless/messaging';
import { decode } from 'bs58';

import { suiProvider } from '../utils/connection';
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
	const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(32));
	const signer = new RawSigner(keypair, suiProvider);

	// Transaction object
	const transaction = TransactionBlock.from(payload.transaction);

	const signedTransaction = await signer.signTransactionBlock({
		transactionBlock: transaction,
	});

	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		signedTransaction,
	});

	return signedTransaction;
};

export const handleSignAndExecuteTransaction: MessengerCallback = async (
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
		privateKey = await getPrivateKey(Networks.sui, payload.passcode);
	} catch (error) {
		responsePayload.responseCode = ResponseCode.WRONG_PASSCODE;
		responsePayload.message = (error as Error).message;

		return channel.postMessage(responsePayload);
	}

	const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(0, 32));
	const signer = new RawSigner(keypair, suiProvider);

	// Transaction object
	const transaction = TransactionBlock.from(payload.transaction);

	try {
		responsePayload.signedTransaction =
			await signer.signAndExecuteTransactionBlock({
				transactionBlock: transaction,
			});
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
	const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(32));
	const signer = new RawSigner(keypair, suiProvider);

	const message = decode(payload.message);

	const signedMessage = await signer.signMessage({ message: message });

	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		signedMessage,
	});

	return signedMessage;
};
