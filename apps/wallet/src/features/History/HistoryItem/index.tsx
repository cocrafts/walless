import type { FC } from 'react';
import { View } from 'react-native';
import type {
	SolanaSwapHistoryV2,
	SolanaTransferHistoryV2,
	SolanaUnknownHistory,
} from '@walless/core';
import { Networks } from '@walless/core';
import type { TransactionHistoryDocument } from '@walless/store';

import SolanaSwapHistoryItem from './SolanaSwap';
import SolanaTransferHistoryItem from './SolanaTransfer';
import { SolanaUnknownHistoryItem } from './SolanaUnknown';

interface Props {
	transaction: TransactionHistoryDocument;
}

export const HistoryItem: FC<Props> = ({ transaction }) => {
	const isSolana = transaction.network === Networks.solana;
	if (isSolana) {
		const { transactionType } = transaction as TransactionHistoryDocument<
			SolanaTransferHistoryV2 | SolanaSwapHistoryV2 | SolanaUnknownHistory
		>;

		if (transactionType === 'Unknown') {
			return (
				<SolanaUnknownHistoryItem
					transaction={
						transaction as TransactionHistoryDocument<SolanaUnknownHistory>
					}
				/>
			);
		} else if (transactionType === 'Swap') {
			return (
				<SolanaSwapHistoryItem
					transaction={
						transaction as TransactionHistoryDocument<SolanaSwapHistoryV2>
					}
				/>
			);
		} else {
			return (
				<SolanaTransferHistoryItem
					transaction={
						transaction as TransactionHistoryDocument<SolanaTransferHistoryV2>
					}
				/>
			);
		}
	} else {
		return <View></View>;
	}
};

export default HistoryItem;
