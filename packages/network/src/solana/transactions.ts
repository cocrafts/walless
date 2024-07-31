import {
	createTransferInstruction as createTransferNftInstruction,
	Metadata,
	TokenStandard,
} from '@metaplex-foundation/mpl-token-metadata';
import {
	ASSOCIATED_TOKEN_PROGRAM_ID,
	createAssociatedTokenAccountInstruction,
	createTransferInstruction as createTransferTokenInstruction,
	getAssociatedTokenAddress,
	TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import type { Connection, TransactionInstruction } from '@solana/web3.js';
import {
	ComputeBudgetProgram,
	PublicKey,
	SYSVAR_INSTRUCTIONS_PUBKEY,
	VersionedMessage,
} from '@solana/web3.js';
import {
	SystemProgram,
	Transaction,
	TransactionMessage,
	VersionedTransaction,
} from '@solana/web3.js';
import { logger } from '@walless/core';

import { TOKEN_AUTH_RULES_KEY } from './constants';
import {
	getMasterEditionPda,
	getMetadataPda,
	getTokenRecordPda,
} from './helpers';
import type {
	Accounts,
	GasilonTransaction,
	NftTransaction,
	SolTransaction,
	SplTransaction,
} from './types';

export const constructSendSOLTransaction = async (
	connection: Connection,
	{ sender, receiver, amount }: SolTransaction,
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
	{ sender, receiver, mint, amount }: SplTransaction,
) => {
	// ATA
	const [senderATAddress, receiverATAddress] = await Promise.all([
		getAssociatedTokenAddress(mint, sender),
		getAssociatedTokenAddress(mint, receiver),
	]);

	const instructions: TransactionInstruction[] = [];

	const createATAInstruction = await constructCreateATAInstruction(connection, {
		mint,
		owner: receiver,
		associatedToken: receiverATAddress,
		payer: sender,
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
	{ sender, receiver, amount, mint }: NftTransaction,
) => {
	// ATA
	const [senderATAddress, receiverATAddress] = await Promise.all([
		getAssociatedTokenAddress(mint, sender),
		getAssociatedTokenAddress(mint, receiver),
	]);

	const instructions: TransactionInstruction[] = [];

	const createATAInstruction = await constructCreateATAInstruction(connection, {
		payer: sender,
		associatedToken: receiverATAddress,
		owner: receiver,
		mint,
	});

	if (createATAInstruction) instructions.push(createATAInstruction);

	// PDA
	const [metadata] = getMetadataPda(mint);
	const [edition] = getMasterEditionPda(mint);
	const [ownerTokenRecord] = getTokenRecordPda({
		mint,
		token: senderATAddress,
	});
	const [destinationTokenRecord] = getTokenRecordPda({
		mint,
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
			mint,
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

/**
 * Construct send SPL Token on Solana to use Gasilon
 * currently support general SPL transaction (token | nft) only
 * still not work for the new nft standard
 */
export const constructGasilonTransaction = async (
	connection: Connection,
	{
		sender,
		receiver,
		amount,
		mint,
		fee,
		feeMint,
		feePayer,
	}: GasilonTransaction,
) => {
	const bh = await connection.getLatestBlockhash('finalized');
	const blockhash = bh.blockhash;

	const lastValidBlockHeight = bh.lastValidBlockHeight;
	const transaction = new Transaction({
		blockhash,
		lastValidBlockHeight,
	});

	const senderAta = await getAssociatedTokenAddress(mint, sender);

	const senderFeeAta = await getAssociatedTokenAddress(feeMint, sender);

	const receiverPublicKey = new PublicKey(receiver);
	const receiverAta = await getAssociatedTokenAddress(mint, receiverPublicKey);

	const feePayerAta = await getAssociatedTokenAddress(feeMint, feePayer);

	const instructions: TransactionInstruction[] = [];

	const feePaymentInstruction = createTransferTokenInstruction(
		senderFeeAta,
		feePayerAta,
		sender,
		fee,
	);

	const receiverAtaInfo = await connection.getAccountInfo(receiverAta);

	const receiverTokenAtaCreationInstruction =
		createAssociatedTokenAccountInstruction(
			feePayer,
			receiverAta,
			receiverPublicKey,
			mint,
		);

	const transferInstruction = createTransferTokenInstruction(
		senderAta,
		receiverAta,
		sender,
		amount,
	);

	instructions.push(feePaymentInstruction);

	if (!receiverAtaInfo) {
		instructions.push(receiverTokenAtaCreationInstruction);
	}
	instructions.push(transferInstruction);

	transaction.feePayer = feePayer;
	transaction.add(...instructions);

	const versionedMessage = VersionedMessage.deserialize(
		transaction.serializeMessage(),
	);
	const versionedTransaction = new VersionedTransaction(versionedMessage);

	return versionedTransaction;
};

type GasilonTransactionConfig = {
	feeAmount: number;
	sender: PublicKey;
	feeMint: PublicKey;
	feePayer: PublicKey;
};

export const withGasilon = async (
	transaction: VersionedTransaction | Transaction,
	{ feeAmount, sender, feeMint, feePayer }: GasilonTransactionConfig,
): Promise<Transaction> => {
	// Gasilon only supports Legacy Transaction
	if (transaction instanceof VersionedTransaction) {
		const legacyMessage = TransactionMessage.decompile(transaction.message);
		transaction = Transaction.populate(legacyMessage.compileToLegacyMessage());
	}

	const [senderFeeAta, feePayerAta] = await Promise.all([
		getAssociatedTokenAddress(feeMint, sender),
		getAssociatedTokenAddress(feeMint, feePayer),
	]);

	const feePaymentInstruction = createTransferTokenInstruction(
		senderFeeAta,
		feePayerAta,
		sender,
		feeAmount,
	);

	transaction.add(feePaymentInstruction);
	transaction.feePayer = feePayer;

	return transaction;
};

export const withSetComputeUnitPrice = async (
	transaction: VersionedTransaction | Transaction,
	connection?: Connection,
) => {
	let microLamports = 20000;
	if (connection) {
		// NOTE: temporarily disable query accounts to fetch prioritized fee because it does not work
		// let accounts: PublicKey[];
		// if (transaction instanceof VersionedTransaction) {
		// 	accounts = transaction.message.staticAccountKeys;
		// } else {
		// 	const allAccounts = transaction.instructions.flatMap((i) =>
		// 		i.keys.map((k) => k.pubkey.toString()),
		// 	);
		// 	accounts = new Array(new Set(allAccounts).values()).map(
		// 		(k) => new PublicKey(k),
		// 	);
		// }

		try {
			const fees = await connection.getRecentPrioritizationFees();

			if (fees.length > 0) {
				// default as base micro lamports
				microLamports = Math.max(fees[0].prioritizationFee, microLamports);
			}
		} catch (error) {
			logger.error('failed to get prioritization fees', error);
		}
	}

	const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
		microLamports,
	});

	if (transaction instanceof VersionedTransaction) {
		const message = TransactionMessage.decompile(transaction.message);
		message.instructions.unshift(addPriorityFee);
		transaction.message = message.compileToV0Message();

		return transaction;
	} else {
		const legacyTransaction = transaction as Transaction;
		legacyTransaction.instructions.push(addPriorityFee);

		return legacyTransaction;
	}
};
