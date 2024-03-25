import type { Connection } from '@solana/web3.js';
import { Keypair, VersionedTransaction } from '@solana/web3.js';
import { logger } from '@walless/core';
import { decode, encode } from 'bs58';
import { sign } from 'tweetnacl';

export const signMessage = async (
	message: string | Uint8Array,
	privateKey: Uint8Array,
): Promise<string> => {
	if (typeof message === 'string') {
		message = decode(message);
	}

	const keypair = Keypair.fromSecretKey(privateKey);
	const signatureBytes = sign.detached(message, keypair.secretKey);

	return encode(signatureBytes);
};

export const signTransaction = async (
	transaction: string | VersionedTransaction,
	privateKey: Uint8Array,
): Promise<string> => {
	const keypair = Keypair.fromSecretKey(privateKey);

	if (typeof transaction === 'string') {
		const serializedTransaction = decode(transaction);
		transaction = VersionedTransaction.deserialize(serializedTransaction);
	}
	transaction.sign([keypair]);

	return encode(transaction.serialize());
};

export type SignAndSendOptions = {
	manuallyRetry: boolean;
};

export const signAndSendTransaction = async (
	connection: Connection,
	transaction: string | VersionedTransaction,
	privateKey: Uint8Array,
	options?: SignAndSendOptions,
): Promise<string> => {
	const keypair = Keypair.fromSecretKey(privateKey);

	if (typeof transaction === 'string') {
		const serializedTransaction = decode(transaction);
		transaction = VersionedTransaction.deserialize(serializedTransaction);
	}

	if (!transaction.message.recentBlockhash) {
		transaction.message.recentBlockhash = (
			await connection.getLatestBlockhash({ commitment: 'finalized' })
		).blockhash;
	}

	transaction.sign([keypair]);

	let signature: string = '';

	// Manually retry the transaction
	// Ref: https://stackoverflow.com/questions/70717996/blockhash-not-found-when-sending-transaction
	if (options?.manuallyRetry) {
		logger.debug('manually retrying the transaction...');
		const { lastValidBlockHeight } = await connection.getLatestBlockhash();
		let count = 0;
		const maxRetries = 30;
		let blockheight = await connection.getBlockHeight();
		while (count < maxRetries && blockheight < lastValidBlockHeight) {
			try {
				signature = await connection.sendTransaction(transaction);
				logger.debug('retry successfully!');
				break;
			} catch (error) {
				logger.debug('retry...', (error as Error).message);
				await new Promise((resolve) => setTimeout(resolve, 500));
				const isBlockhashValid = await connection.isBlockhashValid(
					transaction.message.recentBlockhash,
				);
				if (!isBlockhashValid) throw Error('blockhash is not valid to retry');

				blockheight = await connection.getBlockHeight();
			}

			count++;
		}
	} else {
		signature = await connection.sendTransaction(transaction);
	}

	if (!signature) throw Error('failed to send transaction');

	return signature;
};

export const signAndSendGasilonTransaction = async (
	gasilonEndpoint: string,
	transaction: string | VersionedTransaction,
	privateKey: Uint8Array,
) => {
	const keypair = Keypair.fromSecretKey(privateKey);

	if (typeof transaction === 'string') {
		const serializedTransaction = decode(transaction);
		transaction = VersionedTransaction.deserialize(serializedTransaction);
	}

	transaction.sign([keypair]);

	const txStr = encode(transaction.serialize());

	const res = await fetch(`${gasilonEndpoint}/solana/transfer`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			transaction: txStr,
		}),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message);
	}

	return data.signature;
};
