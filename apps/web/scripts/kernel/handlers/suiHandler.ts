import { Ed25519Keypair, RawSigner, TransactionBlock } from '@mysten/sui.js';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import type { MessengerCallback, ResponsePayload } from '@walless/messaging';
import { ResponseCode } from '@walless/messaging';
import { decode } from 'bs58';

import { getPrivateKey, settings } from '../utils/handler';

export const handleSignTransaction: MessengerCallback = async (
	payload,
	channel,
) => {
	const privateKey = new Uint8Array(32);
	const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(32));
	const signer = new RawSigner(
		keypair,
		modules.engine.getConnection(Networks.sui),
	);

	const transaction = TransactionBlock.from(payload.transaction as string);

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
		privateKey = await getPrivateKey(Networks.sui, payload.passcode as string);
	} catch (error) {
		responsePayload.responseCode = ResponseCode.WRONG_PASSCODE;
		responsePayload.message = (error as Error).message;

		return channel.postMessage(responsePayload);
	}

	const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(0, 32));
	const signer = new RawSigner(
		keypair,
		modules.engine.getConnection(Networks.sui),
	);

	const transaction = TransactionBlock.from(payload.transaction as string);

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
	const privateKey = new Uint8Array(32);
	const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(32));
	const signer = new RawSigner(
		keypair,
		modules.engine.getConnection(Networks.sui),
	);

	const message = decode(payload.message as string);

	const signedMessage = await signer.signMessage({ message: message });

	channel.postMessage({
		from: 'walless@kernel',
		requestId: payload.requestId,
		signedMessage,
	});

	return signedMessage;
};
