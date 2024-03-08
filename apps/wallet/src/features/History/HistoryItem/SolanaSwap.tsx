import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import type { SolanaSwapHistoryV2 } from '@walless/core';
import type { TransactionHistoryDocument } from '@walless/store';

import WrappedHistory from './WrappedHistory';

interface Props {
	transaction: TransactionHistoryDocument<SolanaSwapHistoryV2>;
}

export const SolanaSwapHistoryItem: FC<Props> = ({ transaction }) => {
	return (
		<WrappedHistory transaction={transaction}>
			<View style={styles.container}></View>
		</WrappedHistory>
	);
};

export default SolanaSwapHistoryItem;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red',
		height: 50,
		width: '100%',
	},
});
