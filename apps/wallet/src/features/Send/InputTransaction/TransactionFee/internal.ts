import { useEffect, useMemo } from 'react';
import type { TransactionPayload } from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenDocumentV2 } from '@walless/store';
import type { SolanaTransactionContext } from 'features/Send/internal';
import { useTransactionContext } from 'features/Send/internal';
import {
	getTransactionAbstractFee,
	getTransactionFee,
} from 'utils/transaction';

import { txActions } from './../../context';

export const requestTransactionFee = async (
	payload: TransactionPayload,
): Promise<{
	fee: number;
	feeTokenMint: string;
}> => {
	if (payload.receiver === '') {
		txActions.update({ transactionFee: 0 });
		return {
			fee: 0,
			feeTokenMint: payload.tokenForFee?.account?.mint || '',
		};
	}

	try {
		const fee =
			payload.tokenForFee?.metadata?.symbol !== 'SOL'
				? await getTransactionAbstractFee(payload)
				: await getTransactionFee(payload);
		return {
			fee,
			feeTokenMint: payload.tokenForFee?.account?.mint || '',
		};
	} catch {
		return {
			fee: 0,
			feeTokenMint: payload.tokenForFee?.account?.mint || '',
		};
	}
};

export const getTokenName = (
	tokenForFee: TokenDocumentV2,
	network?: Networks,
) => {
	if (network == Networks.solana) {
		return tokenForFee.symbol;
	} else if (network == Networks.sui) {
		return 'SUI';
	} else if (network == Networks.aptos) {
		return 'APT';
	}

	return 'Unknown';
};

export const useTransactionFee = () => {
	const { tokenForFee, token, nft, amount, type, sender, receiver, network } =
		useTransactionContext<SolanaTransactionContext>();

	const chosenToken = useMemo(() => {
		return type === 'token' ? token : nft;
	}, [token, nft, type]);

	useEffect(() => {
		const updateTransactionFee = async () => {
			if (!chosenToken) {
				txActions.update({ feeAmount: 0 });
				return;
			}

			const payload: TransactionPayload = {
				sender: sender,
				receiver: receiver,
				tokenForFee,
				amount: type === 'token' ? parseFloat(amount || '0') : 1,
				token: chosenToken,
				network,
			};

			const { fee, feeTokenMint } = await requestTransactionFee(payload);
			if (
				feeTokenMint !==
				(txContext.tx.tokenForFee as TokenDocumentV2<SolanaToken>).mint
			)
				return;

			const decimals = payload.tokenForFee?.account?.decimals;
			txActions.update({
				feeAmount: parseFloat(fee.toPrecision(decimals)),
			});
			setIsFeeLoading(false);
		};

		updateTransactionFee();
	}, [tokenForFee, chosenToken]);
};
