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
			return <View style={{ height: 50, backgroundColor: 'blue' }}></View>;
		} else if (transactionType === 'Swap') {
			console.log(JSON.stringify(transaction, null, 2));
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
