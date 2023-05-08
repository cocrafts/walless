import { TransactionBlock } from '@mysten/sui.js';
import {
	clusterApiUrl,
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	TransactionMessage,
	VersionedTransaction,
} from '@solana/web3.js';
import { Networks, Token, TransactionPayload } from '@walless/core';
import { db } from 'utils/storage';

const solConn = new Connection(clusterApiUrl('devnet'));
const sampleKeypair = Keypair.generate();

import { createTransferInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { RequestType, ResponsePayload } from '@walless/messaging';
import { requestHandleTransaction } from 'bridge/listeners';
import { encode } from 'bs58';

export const createAndSend = async (
	payload: TransactionPayload,
	passcode?: string,
) => {
	const transaction = await constructTransaction(payload);

	let res;
	if (transaction instanceof VersionedTransaction) {
		res = await requestHandleTransaction({
			type: RequestType.SIGN_SEND_TRANSACTION_ON_SOLANA,
			transaction: encode(transaction.serialize()),
			passcode,
		});
	} else if (transaction instanceof TransactionBlock) {
		res = await requestHandleTransaction({
			type: RequestType.SIGH_EXECUTE_TRANSACTION_ON_SUI,
			transaction: transaction.serialize(),
			passcode,
		});
	}

	return res as ResponsePayload;
};

export const getWalletPublicKey = async (network: Networks) => {
	return (
		await db.publicKeys.get({
			network: network,
		})
	)?.id;
};

type SendTokenProps = {
	sender: string;
	token: string | Token;
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
	if (network == Networks.solana) {
		if (token == 'SOL') {
			return await constructSendSOLTransaction(
				new PublicKey(sender),
				new PublicKey(receiver),
				amount,
			);
		} else if (
			(token as Token).account &&
			(token as Token).network == Networks.solana
		) {
			return await constructSendSPLTokenTransactionInSol(
				new PublicKey(sender),
				new PublicKey(receiver),
				amount,
				token as Token,
			);
		}
	} else if (network == Networks.sui) {
		if (token == 'SUI') {
			return await constructSendSUITransaction(receiver, amount);
		}
	}

	throw Error('Network or Token is not supported');
};

export const checkValidAddress = (keyStr: string, network: Networks) => {
	try {
		if (network == Networks.solana) {
			new PublicKey(keyStr);
			return { valid: true, message: '' };
		} else if (network == Networks.sui) {
			return { valid: true, message: '' };
		}
		return { valid: false, message: 'Unsupported network ' + network };
	} catch (error) {
		return { valid: false, message: (error as Error).message };
	}
};

export const getTransactionFee = async (network: Networks) => {
	if (network == Networks.solana) {
		const instructions = [
			SystemProgram.transfer({
				fromPubkey: sampleKeypair.publicKey,
				toPubkey: sampleKeypair.publicKey,
				lamports: LAMPORTS_PER_SOL / 10,
			}),
		];

		const message = new TransactionMessage({
			payerKey: sampleKeypair.publicKey,
			recentBlockhash: await solConn
				.getLatestBlockhash()
				.then((res) => res.blockhash),
			instructions,
		}).compileToV0Message();

		return (
			((await solConn.getFeeForMessage(message)).value || 0) / LAMPORTS_PER_SOL
		);
	} else return 0;
};

const constructSendSOLTransaction = async (
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
) => {
	const instructions = [
		SystemProgram.transfer({
			fromPubkey: sender,
			toPubkey: receiver,
			lamports: amount * LAMPORTS_PER_SOL,
		}),
	];

	const blockhash = await solConn
		.getLatestBlockhash()
		.then((res) => res.blockhash);

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions,
	}).compileToV0Message();

	return new VersionedTransaction(message);
};

const constructSendSPLTokenTransactionInSol = async (
	sender: PublicKey,
	receiver: PublicKey,
	amount: number,
	token: Token,
) => {
	const transactionInstruction = createTransferInstruction(
		sender,
		receiver,
		new PublicKey(token.account.owner as string),
		amount,
		[sender],
		TOKEN_PROGRAM_ID,
	);

	const blockhash = await solConn
		.getLatestBlockhash()
		.then((res) => res.blockhash);

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions: [transactionInstruction],
	}).compileToV0Message();

	return new VersionedTransaction(message);
};

const constructSendSUITransaction = async (
	receiver: string,
	amount: number,
) => {
	const tx = new TransactionBlock();

	const DECIMALS = 10 ** 9;

	const [coin] = tx.splitCoins({ kind: 'GasCoin' }, [
		tx.pure(amount * DECIMALS),
	]);

	tx.transferObjects([coin], tx.pure(receiver));
	return tx;
};
