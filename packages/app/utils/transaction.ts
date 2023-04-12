import {
	clusterApiUrl,
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	SystemProgram,
	TransactionMessage,
} from '@solana/web3.js';
import { Networks } from '@walless/core';

import { connection } from './../../network/src/utils/connection';

const solConn = new Connection(clusterApiUrl('devnet'));
const sampleKeypair = Keypair.generate();

type SendTokenProps = {
	token: string;
	network: Networks;
	receiver: string;
	amount: number;
};

export const sendToken = ({
	token,
	network,
	receiver,
	amount,
}: SendTokenProps) => {
	return 0;
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
