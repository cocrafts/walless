import type { VersionedTransaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { solana } from '@walless/network';
import { withGasilon } from '@walless/network/src/solana';
import { getDefaultEngine } from 'engine';
import type { SolanaContext } from 'engine/runners';
import { solMint } from 'utils/constants';

import { getGasilonConfig } from './gasilon';
import type {
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
} from './types';

export const constructSolanaSendTokenTransaction = async (
	transaction: Omit<SolanaSendTokenTransaction, 'type' | 'network'>,
): Promise<VersionedTransaction | undefined> => {
	const {
		sender: senderStr,
		receiver: receiverStr,
		token,
		amount,
		fee,
		tokenForFee,
	} = transaction;

	const sender = new PublicKey(senderStr);
	const receiver = new PublicKey(receiverStr);

	const engine = getDefaultEngine();
	const { connection } = engine.getContext<SolanaContext>(Networks.solana);

	const isNativeTransaction = token.mint == solMint;
	const isGasilonTransaction = tokenForFee && tokenForFee.mint !== solMint;
	if (isNativeTransaction) {
		return await solana.constructSendSOLTransaction(connection, {
			sender,
			receiver,
			amount,
		});
	} else if (isGasilonTransaction) {
		if (!fee) return;

		const config = await getGasilonConfig();
		if (!config) return;

		return await solana.constructGasilonTransaction(connection, {
			sender,
			receiver,
			amount,
			mint: new PublicKey(token.mint),
			fee,
			feeMint: new PublicKey(tokenForFee.mint),
			feePayer: new PublicKey(config.feePayer),
		});
	} else {
		return await solana.constructSendSPLTokenTransaction(connection, {
			sender,
			receiver,
			amount,
			mint: new PublicKey(token.mint),
		});
	}
};

export const constructSolanaSendNftTransaction = async (
	initTransaction: Omit<SolanaSendNftTransaction, 'type' | 'network'>,
): Promise<VersionedTransaction> => {
	const engine = getDefaultEngine();
	const { connection } = engine.getContext<SolanaContext>(Networks.solana);
	const { sender, receiver, amount, nft, tokenForFee, fee } = initTransaction;

	const transaction = await solana.constructSendNftTransaction(connection, {
		sender: new PublicKey(sender),
		receiver: new PublicKey(receiver),
		amount: amount,
		mint: new PublicKey(nft.mint),
	});

	if (tokenForFee && tokenForFee.mint !== solMint && fee) {
		return await withGasilon(transaction, {
			sender: new PublicKey(sender),
			feeAmount: fee,
			feeMint: new PublicKey(tokenForFee.mint),
			feePayer: new PublicKey(nft.mint),
		});
	}

	return transaction;
};
