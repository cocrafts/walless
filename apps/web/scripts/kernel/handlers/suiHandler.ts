import { Ed25519Keypair, RawSigner, TransactionBlock } from '@mysten/sui.js';
import { Networks } from '@walless/core';
import { MessengerCallback, ResponseCode } from '@walless/messaging';
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
		privateKey = await getPrivateKey(Networks.sui, payload.passcode);
	} catch (error) {
		return channel.postMessage({
			...messageHeader,
			responseCode: ResponseCode.WRONG_PASSCODE,
			message: (error as Error).message,
		});
	}

	const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(0, 32));
	const signer = new RawSigner(keypair, suiProvider);

	// Transaction object
	const transaction = TransactionBlock.from(payload.transaction);

	const signedTransaction = await signer.signAndExecuteTransactionBlock({
		transactionBlock: transaction,
	});

	channel.postMessage({
		...messageHeader,
		responseCode: ResponseCode.SUCCESS,
		signedTransaction,
	});

	return signedTransaction;
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
