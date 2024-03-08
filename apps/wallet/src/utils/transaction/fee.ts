import { ACCOUNT_SIZE, getAssociatedTokenAddressSync } from '@solana/spl-token';
import type { VersionedTransaction } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { logger, Networks } from '@walless/core';
import { solana } from '@walless/network';
import base58 from 'bs58';
import { getDefaultEngine } from 'engine';
import type { SolanaContext } from 'engine/runners';
import { environment } from 'utils/config';
import { solMint } from 'utils/constants';

import { constructSendTransaction } from './construct';
import { getGasilonConfig } from './gasilon';
import type {
	SendNftTransaction,
	SendTokenTransaction,
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
	SolanaSendTransaction,
} from './types';

export const hasEnoughBalanceToMakeTx = async (
	initTransaction:
		| SendTokenTransaction
		| SendNftTransaction
		| SolanaSendTokenTransaction
		| SolanaSendNftTransaction,
) => {
	const { network } = initTransaction;

	switch (network) {
		case Networks.solana: {
			const SolanaTransaction = initTransaction as SolanaSendTransaction;
			const { tokenForFee, type } = SolanaTransaction;

			if (tokenForFee && tokenForFee.mint !== solMint) {
				const fee = await getGasilonFee(SolanaTransaction);
				if (tokenForFee.balance < fee) return false;

				if (type === 'token') {
					const { token, amount } =
						initTransaction as SolanaSendTokenTransaction;
					if (token.mint === tokenForFee?.mint) {
						return token.balance + tokenForFee.balance > amount;
					}
					return token.balance > amount;
				}
			} else if (tokenForFee && tokenForFee.mint === solMint) {
				const fee = await getSolanaTransactionFee(initTransaction);
				return tokenForFee.balance > fee;
			}
			break;
		}
		default: {
			return false;
		}
	}
};

export const getSolanaTransactionFee = async (
	initTransaction:
		| SendTokenTransaction
		| SendNftTransaction
		| SolanaSendTokenTransaction
		| SolanaSendNftTransaction,
) => {
	const transaction = await constructSendTransaction(initTransaction);
	if (!transaction) return 0;

	const engine = getDefaultEngine();
	const { connection } = engine.getContext<SolanaContext>(Networks.solana);

	const message = (transaction as VersionedTransaction).message;
	const transactionFeePromise = connection
		.getFeeForMessage(message)
		.then((res) => res.value || 0);

	const rentFeePromise = (async () => {
		const { receiver } = initTransaction;
		let mint;
		if (initTransaction.type === 'token') {
			const { token } = initTransaction as SolanaSendTokenTransaction;
			if (token.mint === solMint) return 0;
			mint = token.mint;
		} else {
			const { nft } = initTransaction as SolanaSendNftTransaction;
			mint = nft.mint;
		}

		const receiverATAddress = getAssociatedTokenAddressSync(
			new PublicKey(mint),
			new PublicKey(receiver),
		);

		const receiverATAccount =
			await connection.getAccountInfo(receiverATAddress);

		if (!receiverATAccount) {
			return await connection.getMinimumBalanceForRentExemption(ACCOUNT_SIZE);
		}

		return 0;
	})();

	const [txFee, rentFee] = await Promise.all([
		transactionFeePromise,
		rentFeePromise,
	]);

	return txFee + rentFee;
};

export const getGasilonFee = async (
	initTransaction:
		| SolanaSendTransaction
		| SolanaSendTokenTransaction
		| SolanaSendNftTransaction,
) => {
	if (!initTransaction.tokenForFee)
		throw Error('No token for fee found for gasilon transaction');

	const config = await getGasilonConfig();
	if (!config) return 0;

	const { type, sender, amount, receiver, tokenForFee } = initTransaction;

	const feeMint = new PublicKey(tokenForFee.mint);
	let mint;
	if (type === 'token') {
		const { token } = initTransaction as SolanaSendTokenTransaction;
		mint = new PublicKey(token.mint);
	} else {
		const { nft } = initTransaction as SolanaSendNftTransaction;
		mint = new PublicKey(nft.mint);
	}

	const engine = getDefaultEngine();
	const { connection } = engine.getContext<SolanaContext>(Networks.solana);
	const transaction = await solana.constructGasilonTransaction(connection, {
		sender: new PublicKey(sender),
		receiver: new PublicKey(receiver),
		feePayer: new PublicKey(config.feePayer),
		amount: amount,
		fee: 0, // mock amount for get gee
		mint,
		feeMint,
	});

	try {
		const res = await fetch(`${environment.GASILON_ENDPOINT}/solana/getFee`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				transaction: base58.encode(transaction.serialize()),
			}),
		});

		const data = await res.json();

		return data.totalByFeeToken;
	} catch (error) {
		logger.error('Failed to get gasilon transaction fee', error);
	}
};
