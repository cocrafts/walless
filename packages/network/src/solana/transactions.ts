import {
	Connection,
	Keypair,
	MessageV0,
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
	try {
		const keypair = Keypair.fromSecretKey(privateKey);
		if (transaction instanceof Transaction) {
			const signatureString = await connection.sendTransaction(
				transaction,
				[keypair],
				options,
			);
			return signatureString;
		} else if (transaction instanceof VersionedTransaction) {
			const latestBlockhash = await connection.getLatestBlockhash();

			(transaction.message as MessageV0).recentBlockhash =
				latestBlockhash.blockhash;

			transaction.sign([keypair]);
			const signatureString = await connection.sendTransaction(transaction, {
				...options,
			});

			return signatureString;
		}
	} catch (error) {
		console.log('error', error);
		throw Error(error);
	}
};
