import { TransactionBlock } from '@mysten/sui.js';
import {
	createAssociatedTokenAccountInstruction,
	createTransferInstruction,
	getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import type { Connection } from '@solana/web3.js';
import {
	Keypair,
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	TransactionMessage,
	VersionedTransaction,
} from '@solana/web3.js';
import type { Collectible, TezosTransaction, Token } from '@walless/core';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';

export const checkValidAddress = (keyStr: string, network: Networks) => {
	try {
		if (network == Networks.solana) {
			new PublicKey(keyStr);
			return { valid: true, message: '' };
		} else if (network == Networks.sui) {
			return { valid: true, message: '' };
		} else if (network == Networks.tezos) {
			return { valid: true, message: '' };
		}
		return { valid: false, message: 'Unsupported network ' + network };
	} catch (error) {
		return { valid: false, message: (error as Error).message };
	}
};

export const getTransactionFee = async (network: Networks) => {
	if (network == Networks.solana) {
		const connection = modules.engine.getConnection(network) as Connection;
		const sampleKeypair = Keypair.generate();
		const instructions = [
			SystemProgram.transfer({
				fromPubkey: sampleKeypair.publicKey,
				toPubkey: sampleKeypair.publicKey,
				lamports: LAMPORTS_PER_SOL / 10,
			}),
		];

		const message = new TransactionMessage({
			payerKey: sampleKeypair.publicKey,
			recentBlockhash: (await connection.getLatestBlockhash('finalized'))
				.blockhash,
			instructions,
		}).compileToV0Message();

		return (
			((await connection.getFeeForMessage(message)).value || 0) /
			LAMPORTS_PER_SOL
		);
	} else if (network == Networks.sui) {
		// TODO: calculate fee on SUI
		return 0;
	} else return 0;
};

type SendTokenProps = {
	sender: string;
	token: Token | Collectible;
	network: Networks;
	receiver: string;
	amount: number;
};

export const constructTransaction = async ({
	sender,
	token,
	network,
	receiver,
	amount,
}: SendTokenProps) => {
	const decimals = (token as Token).account?.decimals
		? 10 ** ((token as Token).account.decimals || 0)
		: 1;

	if (network == Networks.solana) {
		const connection = modules.engine.getConnection(network) as Connection;
		if (token.metadata?.symbol == 'SOL') {
			return await constructSendSOLTransaction(
				connection,
				new PublicKey(sender),
				new PublicKey(receiver),
				amount * decimals,
			);
		} else if (token.network == Networks.solana) {
			return await constructSendSPLTokenTransactionInSol(
				connection,
				new PublicKey(sender),
				new PublicKey(receiver),
				amount * decimals,
				token as Token,
			);
		}
	} else if (network == Networks.sui) {
		if (token.metadata?.symbol == 'SUI') {
			return await constructSendSUITransaction(receiver, amount * decimals);
		}
	} else if (network == Networks.tezos) {
		if (token.metadata?.symbol == 'TEZ') {
			return constructSendTezTransaction(receiver, amount);
		}
	}

	throw Error('Network or Token is not supported');
};

const constructSendSOLTransaction = async (
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

const constructSendSPLTokenTransactionInSol = async (
	connection: Connection,
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
	token: Token | Collectible,
) => {
	const mintAddress = new PublicKey(token.account.mint as string);
	const senderATAddress = getAssociatedTokenAddressSync(mintAddress, sender);
	const ReceiverATAddress = getAssociatedTokenAddressSync(
		mintAddress,
		receiver,
	);
	const receiverATA = await connection.getAccountInfo(ReceiverATAddress);

	const instructions = [];
	if (!receiverATA) {
		const createATAInstruction = createAssociatedTokenAccountInstruction(
			sender,
			ReceiverATAddress,
			receiver,
			mintAddress,
		);
		instructions.push(createATAInstruction);
	}

	const transferInstruction = createTransferInstruction(
		senderATAddress,
		ReceiverATAddress,
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

const constructSendSUITransaction = async (
	receiver: string,
	amount: number,
) => {
	const tx = new TransactionBlock();

	const [coin] = tx.splitCoins({ kind: 'GasCoin' }, [tx.pure(amount)]);

	tx.transferObjects([coin], tx.pure(receiver));
	return tx;
};

const constructSendTezTransaction = (
	receiver: string,
	amount: number,
): TezosTransaction => {
	return {
		type: 'native',
		receiver,
		amount,
	};
};
