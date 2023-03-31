import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
	AddressLookupTableAccount,
	Connection,
	Keypair,
	sendAndConfirmTransaction,
	SendOptions,
	Transaction,
	TransactionMessage,
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
			console.log('here');
			const signatureString = await connection.sendTransaction(
				transaction,
				[keypair],
				options,
			);
			return signatureString;
		} else if (transaction instanceof VersionedTransaction) {
			// Add recent blockhash into message
			const legacyTransaciont = Transaction.from(transaction.serialize());
			console.log(
				legacyTransaciont.instructions[0].programId == TOKEN_PROGRAM_ID,
				'<-- TOKEN_PROGRAM_ID',
			);
			console.log('1');
			const latestBlockhash = await connection.getLatestBlockhash();
			console.log('2');
			const originalMessage = TransactionMessage.decompile(transaction.message);
			console.log('3');
			originalMessage.recentBlockhash = latestBlockhash.blockhash;
			console.log('4');

			// Prepare address lookup table
			const lookUpTableAccount = await connection.getAddressLookupTable(
				keypair.publicKey,
			);

			console.log('lookUpTableAccount.value', lookUpTableAccount.value);

			// Recompile v0 message
			transaction.message = originalMessage.compileToV0Message([
				lookUpTableAccount.value as AddressLookupTableAccount,
			]);

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

	throw Error('Invalid transaction');
};
