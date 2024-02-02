import type { TransactionPayload } from '@walless/core';
import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';
import {
	getTransactionAbstractFee,
	getTransactionFee,
} from 'utils/transaction';

import { txActions } from '../../context';

export const requestTransactionFee = async (payload: TransactionPayload) => {
	if (payload.receiver === '') {
		txActions.update({ transactionFee: 0 });
		return 0;
	}

	try {
		const fee =
			payload.tokenForFee?.metadata?.symbol !== 'SOL'
				? await getTransactionAbstractFee(payload)
				: await getTransactionFee(payload);
		return fee;
	} catch {
		return 0;
	}
};

export const getTokenName = (
	tokenForFee: TokenDocument,
	network?: Networks,
) => {
	if (network == Networks.solana) {
		if (tokenForFee && tokenForFee.metadata?.symbol) {
			return tokenForFee.metadata.symbol;
		} else {
			return 'Unknown';
		}
	} else if (network == Networks.sui) {
		return 'SUI';
	} else if (network == Networks.aptos) {
		return 'APT';
	}

	return 'Unknown';
};
