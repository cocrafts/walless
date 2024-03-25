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
	transaction: VersionedTransaction,
	{ feeAmount, sender, feeMint, feePayer }: GasilonTransactionConfig,
): Promise<Transaction> => {
	const legacyMessage = TransactionMessage.decompile(transaction.message);

	// Gasilon only supports Legacy Transaction
	const gasilonTransaction = Transaction.populate(
		legacyMessage.compileToLegacyMessage(),
	);

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

	gasilonTransaction.add(feePaymentInstruction);

	return gasilonTransaction;
};

export const withSetComputeUnitLimit = (transaction: VersionedTransaction) => {
	const message = TransactionMessage.decompile(transaction.message);
	const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
		microLamports: 20000,
	});
	message.instructions.unshift(addPriorityFee);
	transaction.message = message.compileToV0Message();

	return transaction;
};
