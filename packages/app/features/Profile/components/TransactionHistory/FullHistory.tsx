import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';

import { useHistory } from '../../../../utils/hooks';

import HistoryItem from './HistoryItem';

interface Props {
	network?: Networks;
}

export const FullHistoryFeature: FC<Props> = ({ network }) => {
	const history = useHistory(network);
	const [loading, setLoading] = useState(true);

	let date = '';

	const option: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	useEffect(() => {
		if (history) {
			setLoading(false);
		}
	}, [history]);

	return (
		<View>
			{loading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.transactionsContainer}>
					{history.map((transaction) => {
						let isOnTheSameDate = true;
						const transactionDate = transaction.date.toLocaleDateString(
							'en-US',
							option,
						);
						if (date !== transactionDate) {
							date = transaction.date.toLocaleDateString('en-US', option);
							isOnTheSameDate = false;
						}
						return isOnTheSameDate ? (
							<HistoryItem key={transaction.signature} {...transaction} />
						) : (
							<View
								key={transaction.signature}
								style={styles.dateAndTransactionContainer}
							>
								<Text style={styles.date}>{transactionDate}</Text>
								<HistoryItem {...transaction} />
							</View>
						);
					})}
				</View>
			)}
		</View>
	);
};

export default FullHistoryFeature;

const styles = StyleSheet.create({
	transactionsContainer: {
		gap: 8,
	},
	dateAndTransactionContainer: {
		gap: 10,
	},
	date: {
		color: '#ffffff',
		marginTop: 8,
	},
});
