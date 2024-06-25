import type { FC } from 'react';
import { View } from 'react-native';
import type {
	SolanaSwapHistory,
	SolanaTransferHistory,
	SolanaUnknownHistory,
} from '@walless/core';
import { Networks } from '@walless/core';
import type { HistoryDocument } from '@walless/store';

import SolanaSwapHistoryItem from './SolanaSwap';
import SolanaTransferHistoryItem from './SolanaTransfer';
import { SolanaUnknownHistoryItem } from './SolanaUnknown';

interface Props {
	transaction: HistoryDocument<
		SolanaTransferHistory | SolanaSwapHistory | SolanaUnknownHistory
	>;
}

export const HistoryItem: FC<Props> = ({ transaction }) => {
	const isSolana = transaction.network === Networks.solana;
	if (isSolana) {
		const { transactionType } = transaction;

		if (transactionType === 'Unknown') {
			return (
				<SolanaUnknownHistoryItem
					transaction={transaction as HistoryDocument<SolanaUnknownHistory>}
				/>
			);
		} else if (transactionType === 'Swap') {
			return (
				<SolanaSwapHistoryItem
					transaction={transaction as HistoryDocument<SolanaSwapHistory>}
				/>
			);
		} else {
			return (
				<SolanaTransferHistoryItem
					transaction={transaction as HistoryDocument<SolanaTransferHistory>}
				/>
			);
		}
	} else {
		return <View></View>;
	}
};

export default HistoryItem;
