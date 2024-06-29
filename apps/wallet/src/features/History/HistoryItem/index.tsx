import type { FC } from 'react';
import { View } from 'react-native';
import { Networks } from '@walless/core';
import type { SolanaHistoryDocument } from '@walless/store';

import SolanaSwapHistoryItem from './SolanaSwap';
import SolanaTransferHistoryItem from './SolanaTransfer';
import { SolanaUnknownHistoryItem } from './SolanaUnknown';

interface Props {
	transaction: SolanaHistoryDocument;
}

export const HistoryItem: FC<Props> = ({ transaction }) => {
	const isSolana = transaction.network === Networks.solana;
	if (isSolana) {
		const { transactionType } = transaction;

		if (transactionType === 'Unknown') {
			return <SolanaUnknownHistoryItem transaction={transaction} />;
		} else if (transactionType === 'Swap') {
			return <SolanaSwapHistoryItem transaction={transaction} />;
		} else {
			return <SolanaTransferHistoryItem transaction={transaction} />;
		}
	} else {
		return <View></View>;
	}
};

export default HistoryItem;
