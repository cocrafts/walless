import type { Connection } from '@solana/web3.js';
import { Keypair, VersionedTransaction } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import { decode, encode } from 'bs58';
import { sign } from 'tweetnacl';

export const signMessage = async (
	messageStr: string,
	privateKey: Uint8Array,
) => {
	const message = decode(messageStr);
	const keypair = Keypair.fromSecretKey(privateKey);
	const signatureBytes = sign.detached(message, keypair.secretKey);

	return encode(signatureBytes);
};

export const signTransaction = async (
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const keypair = Keypair.fromSecretKey(privateKey);
	const serializedTransaction = decode(transactionStr);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);
	transaction.sign([keypair]);

	return encode(transaction.serialize());
};

export const signAndSendTransaction = async (
	transactionStr: string,
	privateKey: Uint8Array,
) => {
	const connection = modules.engine.getConnection(
		Networks.solana,
	) as Connection;

	const keypair = Keypair.fromSecretKey(privateKey);

	const serializedTransaction = decode(transactionStr);
	const transaction = VersionedTransaction.deserialize(serializedTransaction);

	if (!transaction.message.recentBlockhash) {
		transaction.message.recentBlockhash = (
			await connection.getLatestBlockhash({ commitment: 'finalized' })
		).blockhash;
	}

	transaction.sign([keypair]);
	const signatureStr = await connection.sendTransaction(transaction);

	return signatureStr;
};
