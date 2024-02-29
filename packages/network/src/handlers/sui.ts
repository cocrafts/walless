import type { SuiClient } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { decode } from 'bs58';

export const signMessage = async (
	messageStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey);
	const message = decode(messageStr);
	const signedMessage = await keypair.signPersonalMessage(message);

	return signedMessage;
};

export const signTransaction = async (
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey);
	const transaction = decode(transactionStr);
	const signedTransaction = await keypair.signTransactionBlock(transaction);

	return signedTransaction;
};

export const signAndExecuteTransaction = async (
	suiClient: SuiClient,
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(0, 32));

	const transaction = decode(transactionStr);

	const executedTransaction = suiClient.signAndExecuteTransactionBlock({
		transactionBlock: transaction,
		signer: keypair,
	});

	return executedTransaction;
};
