import type { FC } from 'react';
import { Fragment, useEffect, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import { convertDateToReadable } from 'utils/format';
import { useHistory } from 'utils/hooks';

import HistoryItem from './HistoryItem';

interface Props {
	style?: StyleProp<ViewStyle>;
	network?: Networks;
	limit?: number;
}

const HistoryFeature: FC<Props> = ({ style, network, limit }) => {
	const history = useHistory(network);
	const [loading, setLoading] = useState(true);

	let date = '';

	useEffect(() => {
		if (history) {
			setLoading(false);
		}
	}, [history]);

	return (
		<ScrollView
			style={[styles.container, style]}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}
		>
			{loading ? (
				<ActivityIndicator />
			) : (
				<Fragment>
					{history.slice(0, limit).map((transaction) => {
						let isOnTheSameDate = true;
						const transactionDate = convertDateToReadable(
							new Date(transaction.date),
						);
						if (date !== transactionDate) {
							date = convertDateToReadable(new Date(transaction.date));
							isOnTheSameDate = false;
						}

						if ('token' in transaction)
							return isOnTheSameDate ? (
								<HistoryItem
									key={transaction.signature}
									transaction={transaction}
								/>
							) : (
								<View
									key={transaction.signature}
									style={styles.dateAndTransactionContainer}
								>
									<Text style={styles.date}>{transactionDate}</Text>
									<HistoryItem transaction={transaction} />
								</View>
							);
					})}
				</Fragment>
			)}
		</ScrollView>
	);
};

export default HistoryFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
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
