import { Networks } from '@walless/core';
import { engine } from 'engine';
import type { SuiContext } from 'engine/runners';
import { solMint } from 'utils/constants';

import { getGasilonFee, getSolanaTransactionFee } from './solana';
import { constructSuiSendTokenTransaction, getSuiTransactionFee } from './sui';
import type {
	SendNftTransaction,
	SendTokenTransaction,
	SolanaSendNftTransaction,
	SolanaSendTokenTransaction,
	SuiSendTransaction,
	TezosSendTokenTransaction,
} from './types';

export const hasEnoughBalanceToMakeTx = async (
	initTransaction:
		| SendTokenTransaction
		| SendNftTransaction
		| SolanaSendTokenTransaction
		| SolanaSendNftTransaction
		| SuiSendTransaction
		| TezosSendTokenTransaction,
) => {
	const { network } = initTransaction;

	switch (network) {
		case Networks.solana: {
			const solanaTransaction = initTransaction as SolanaSendTokenTransaction &
				SolanaSendNftTransaction;
			const { sender, receiver, tokenForFee, type, token, nft } =
				solanaTransaction;

			const isGasilon = tokenForFee && tokenForFee.mint !== solMint;
			if (isGasilon) {
				const fee = await getGasilonFee({
					sender,
					receiver,
					mint: type === 'token' ? token.mint : nft.mint,
					feeMint: solMint,
				});
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
				const fee = await getSolanaTransactionFee(solanaTransaction);
				return tokenForFee.balance > fee;
			}
			break;
		}
		case Networks.sui: {
			const suiTransaction = initTransaction as SuiSendTransaction;
			try {
				const { client } = engine.getContext<SuiContext>(Networks.sui);
				const transactionBlock = await constructSuiSendTokenTransaction(
					client,
					suiTransaction,
				);
				const fee = await getSuiTransactionFee(transactionBlock);

				return suiTransaction.tokenForFee.balance > fee;
			} catch {
				return false;
			}
		}
		case Networks.tezos: {
			const tezosTransaction = initTransaction as TezosSendTokenTransaction;
			return tezosTransaction.token.balance > tezosTransaction.amount;
		}
		default: {
			return false;
		}
	}
};
