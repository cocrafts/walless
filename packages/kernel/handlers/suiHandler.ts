import { Ed25519Keypair, RawSigner, TransactionBlock } from '@mysten/sui.js';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import { decode } from 'bs58';

export const handleSignMessage = async (
	messageStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey);
	const signer = new RawSigner(
		keypair,
		modules.engine.getConnection(Networks.sui),
	);

	const message = decode(messageStr);

	const signedMessage = await signer.signMessage({ message: message });

	return signedMessage;
};

export const handleSignTransaction = async (
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey);
	const signer = new RawSigner(
		keypair,
		modules.engine.getConnection(Networks.sui),
	);

	const transaction = TransactionBlock.from(transactionStr);

	const signedTransaction = await signer.signTransactionBlock({
		transactionBlock: transaction,
	});

	return signedTransaction;
};

export const handleSignAndExecuteTransaction = async (
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Ed25519Keypair.fromSecretKey(privateKey.slice(0, 32));
	const signer = new RawSigner(
		keypair,
		modules.engine.getConnection(Networks.sui),
	);

	const transaction = TransactionBlock.from(transactionStr);

	const signedTransaction = await signer.signAndExecuteTransactionBlock({
		transactionBlock: transaction,
	});

	return signedTransaction;
};
