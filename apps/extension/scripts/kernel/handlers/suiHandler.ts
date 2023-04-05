import { Ed25519Keypair, RawSigner, TransactionBlock } from '@mysten/sui.js';
import { MessengerCallback } from '@walless/messaging';
import { decode } from 'bs58';

import { suiProvider } from '../utils/connection';
import { triggerActionToGetPrivateKey } from '../utils/handler';

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

	const signedTransaction = await signer.signAndExecuteTransactionBlock({
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
