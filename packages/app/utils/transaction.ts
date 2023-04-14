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
import { Networks } from '@walless/core';
import { db } from 'utils/storage';

import { connection } from './../../network/src/utils/connection';

const solConn = new Connection(clusterApiUrl('devnet'));
const sampleKeypair = Keypair.generate();

type SendTokenProps = {
	sender: string;
	token: string;
	network: Networks;
	receiver: string;
	amount: number;
};

export const getWalletPublicKey = async (network: Networks) => {
	const keyString = (await db.publicKeys.toArray()).find(
		(e) => e.network == network,
	)?.id;

	console.log(keyString);
	return keyString;
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
		} else {
			throw Error('Token is not supported');
		}
	} else {
		throw Error('Network is not supported');
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
			recentBlockhash: await connection
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

	const blockhash = await connection
		.getLatestBlockhash()
		.then((res) => res.blockhash);

	const message = new TransactionMessage({
		payerKey: new PublicKey(sender),
		recentBlockhash: blockhash,
		instructions,
	}).compileToV0Message();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const transaction = new VersionedTransaction(message);

	return transaction;
};
