import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import HistoryItem from 'screens/Profile/components/TransactionHistory/HistoryItem';
import { useHistory } from 'utils/hooks';

interface Props {
	network: Networks;
}

const ActivityTab: FC<Props> = ({ network }) => {
	const history = useHistory(network);

	let date = '';
	const option: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	return (
		<View style={styles.container}>
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
						<Text>{transactionDate}</Text>
						<HistoryItem {...transaction} />
					</View>
				);
			})}
		</View>
	);
};

export default ActivityTab;

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
		gap: 8,
	},
	dateAndTransactionContainer: {
		gap: 10,
	},
});
