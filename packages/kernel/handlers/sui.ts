import type { JsonRpcProvider } from '@mysten/sui.js';
import { Ed25519Keypair, RawSigner, TransactionBlock } from '@mysten/sui.js';
import { decode } from 'bs58';

export const signMessage = async (
	provider: JsonRpcProvider,
	messageStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey);
	const signer = new RawSigner(keypair, provider);

	const message = decode(messageStr);

	const signedMessage = await signer.signMessage({ message: message });

	return signedMessage;
};

export const signTransaction = async (
	provider: JsonRpcProvider,
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey);
	const signer = new RawSigner(keypair, provider);

	const transaction = TransactionBlock.from(transactionStr);

	const signedTransaction = await signer.signTransactionBlock({
		transactionBlock: transaction,
	});

	return signedTransaction;
};

export const signAndExecuteTransaction = async (
	provider: JsonRpcProvider,
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(0, 32));
	const signer = new RawSigner(keypair, provider);

	const transaction = TransactionBlock.from(transactionStr);

	const signedTransaction = await signer.signAndExecuteTransactionBlock({
		transactionBlock: transaction,
	});

	return signedTransaction;
};
