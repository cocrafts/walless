import type { VersionedTransaction } from '@solana/web3.js';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { solana } from '@walless/network';
import { engine } from 'engine';
import type { SolanaContext } from 'engine/runners';
import { solMint } from 'utils/constants';
import type {
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
} from 'utils/transaction/types';

export const constructSolanaSendTokenTransaction = async (
	transaction: Omit<
		SolanaSendTokenTransaction,
		'type' | 'network' | 'fee' | 'tokenForFee'
	>,
): Promise<VersionedTransaction | undefined> => {
	const {
		sender: senderStr,
		receiver: receiverStr,
		token,
		amount,
	} = transaction;

	const sender = new PublicKey(senderStr);
	const receiver = new PublicKey(receiverStr);

	const { connection } = engine.getContext<SolanaContext>(Networks.solana);

	const isNativeTransaction = token.mint == solMint;
	if (isNativeTransaction) {
		return await solana.constructSendSOLTransaction(connection, {
			sender,
			receiver,
			amount: amount * LAMPORTS_PER_SOL,
		});
	} else {
		return await solana.constructSendSPLTokenTransaction(connection, {
			sender,
			receiver,
			amount: Math.round(amount * 10 ** token.decimals),
			mint: new PublicKey(token.mint),
		});
	}
};

export const constructSolanaSendNftTransaction = async (
	initTransaction: Omit<
		SolanaSendNftTransaction,
		'type' | 'network' | 'fee' | 'tokenForFee'
	>,
): Promise<VersionedTransaction> => {
	const { connection } = engine.getContext<SolanaContext>(Networks.solana);
	const { sender, receiver, amount, nft } = initTransaction;

	const transaction = await solana.constructSendNftTransaction(connection, {
		sender: new PublicKey(sender),
		receiver: new PublicKey(receiver),
		amount: amount,
		mint: new PublicKey(nft.mint),
	});

	return transaction;
};
