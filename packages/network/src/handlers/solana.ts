import type { Connection } from '@solana/web3.js';
import { Keypair, VersionedTransaction } from '@solana/web3.js';
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

export const signAndSendTransaction = async (
	connection: Connection,
	transaction: string | VersionedTransaction,
	privateKey: Uint8Array,
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
	const signatureStr = await connection.sendTransaction(transaction);

	return signatureStr;
};

export const signAndSendTransactionAbstractionFee = async (
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
