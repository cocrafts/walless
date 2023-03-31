import {
	Connection,
	Keypair,
	SendOptions,
	Transaction,
	VersionedTransaction,
} from '@solana/web3.js';
import { sign } from 'tweetnacl';

export const signMessage = (message: Uint8Array, privateKey: Uint8Array) => {
	const keypair = Keypair.fromSecretKey(privateKey);
	const signatureBytes = sign.detached(message, keypair.secretKey);
	return signatureBytes;
};

export const signAndSendTransaction = async (
	connection: Connection,
	transaction: VersionedTransaction | Transaction,
	options: SendOptions,
	privateKey: Uint8Array,
) => {
	const keypair = Keypair.fromSecretKey(privateKey);
	if (transaction instanceof Transaction) {
		const signatureString = await connection.sendTransaction(
			transaction,
			[keypair],
			options,
		);
		return signatureString;
	} else if (transaction instanceof VersionedTransaction) {
		console.log('VersionedTransaction');
		transaction.sign([keypair]);
		try {
			const signatureString = await connection.sendTransaction(
				transaction,
				options,
			);
			return signatureString;
		} catch (error) {
			console.log(error);
			throw Error(error);
		}
	}

	throw Error('Invalid transaction');
};
