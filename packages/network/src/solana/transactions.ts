import {
	createTransferInstruction as createTransferNftInstruction,
	Metadata,
	TokenStandard,
} from '@metaplex-foundation/mpl-token-metadata';
import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	createAssociatedTokenAccountInstruction,
	createTransferInstruction as createTransferTokenInstruction,
	getAssociatedTokenAddressSync,
	TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import type { Connection, MessageV0, SendOptions } from '@solana/web3.js';
import { PublicKey, SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js';
import {
	Keypair,
	SystemProgram,
	Transaction,
	TransactionMessage,
	VersionedTransaction,
} from '@solana/web3.js';
import type { Collectible, Token } from '@walless/core';
import { logger } from '@walless/core';
import { decode } from 'bs58';
import { sign } from 'tweetnacl';

import { TOKEN_AUTH_RULES_KEY } from './constants';
import {
	getMasterEditionPda,
	getMetadataPda,
	getTokenRecordPda,
} from './helpers';

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
		throw Error(error as never);
	}
};

export const simulateTransaction = async (
	connection: Connection,
	transaction: string,
) => {
	const tx = VersionedTransaction.deserialize(decode(transaction));

	const simulatedTx = await connection.simulateTransaction(tx);
	logger.debug('Simulated transaction:', simulatedTx);
};

export const constructSendSOLTransaction = async (
	connection: Connection,
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
) => {
	const instructions = [
		SystemProgram.transfer({
			fromPubkey: sender,
			toPubkey: receiver,
			lamports: amount,
		}),
	];

	const blockhash = (await connection.getLatestBlockhash('finalized'))
		.blockhash;

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions,
	}).compileToV0Message();

	return new VersionedTransaction(message);
};

interface Accounts {
	payer: PublicKey;
	associatedToken: PublicKey;
	owner: PublicKey;
	mint: PublicKey;
}

const constructCreateATAInstruction = async (
	connection: Connection,
	{ payer, associatedToken, owner, mint }: Accounts,
) => {
	const associatedInfo = await connection.getAccountInfo(associatedToken);

	if (associatedInfo) return;

	return createAssociatedTokenAccountInstruction(
		payer,
		associatedToken,
		owner,
		mint,
	);
};

export const constructSendSPLTokenTransaction = async (
	connection: Connection,
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
	token: Token,
) => {
	// ATA
	const mintAddress = new PublicKey(token.account.mint);
	const senderATAddress = getAssociatedTokenAddressSync(mintAddress, sender);
	const receiverATAddress = getAssociatedTokenAddressSync(
		mintAddress,
		receiver,
	);

	const instructions = [];

	const createATAInstruction = await constructCreateATAInstruction(connection, {
		payer: sender,
		associatedToken: receiverATAddress,
		owner: receiver,
		mint: mintAddress,
	});

	if (createATAInstruction) instructions.push(createATAInstruction);

	const transferInstruction = createTransferTokenInstruction(
		senderATAddress,
		receiverATAddress,
		sender,
		amount,
	);
	instructions.push(transferInstruction);

	const blockhash = (await connection.getLatestBlockhash('finalized'))
		.blockhash;

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions: instructions,
	}).compileToV0Message();

	return new VersionedTransaction(message);
};

export const constructSendNftTransaction = async (
	connection: Connection,
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
	collectible: Collectible,
) => {
	// ATA
	const mintAddress = new PublicKey(collectible.account.mint);
	const senderATAddress = getAssociatedTokenAddressSync(mintAddress, sender);
	const receiverATAddress = getAssociatedTokenAddressSync(
		mintAddress,
		receiver,
	);

	const instructions = [];

	const createATAInstruction = await constructCreateATAInstruction(connection, {
		payer: sender,
		associatedToken: receiverATAddress,
		owner: receiver,
		mint: mintAddress,
	});

	if (createATAInstruction) instructions.push(createATAInstruction);

	// PDA
	const [metadata] = getMetadataPda(mintAddress);
	const [edition] = getMasterEditionPda(mintAddress);
	const [ownerTokenRecord] = getTokenRecordPda({
		mint: mintAddress,
		token: senderATAddress,
	});
	const [destinationTokenRecord] = getTokenRecordPda({
		mint: mintAddress,
		token: receiverATAddress,
	});

	let isProgrammable = false;
	const metadataInfo = await connection.getAccountInfo(metadata);
	if (metadataInfo?.data) {
		const [data] = Metadata.deserialize(metadataInfo.data);
		const { tokenStandard } = data;
		isProgrammable = tokenStandard === TokenStandard.ProgrammableNonFungible;
	}

	const transferInstruction = createTransferNftInstruction(
		{
			token: senderATAddress,
			tokenOwner: sender,
			destination: receiverATAddress,
			destinationOwner: receiver,
			mint: mintAddress,
			metadata,
			payer: sender,
			edition,
			ownerTokenRecord: isProgrammable ? ownerTokenRecord : undefined,
			destinationTokenRecord: isProgrammable
				? destinationTokenRecord
				: undefined,
			splAtaProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			splTokenProgram: TOKEN_PROGRAM_ID,
			authority: sender,
			sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
			authorizationRulesProgram: TOKEN_AUTH_RULES_KEY,
		},
		{
			transferArgs: {
				__kind: 'V1',
				amount,
				authorizationData: null,
			},
		},
	);
	instructions.push(transferInstruction);

	const blockhash = (await connection.getLatestBlockhash('finalized'))
		.blockhash;

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions: instructions,
	}).compileToV0Message();

	return new VersionedTransaction(message);
};
