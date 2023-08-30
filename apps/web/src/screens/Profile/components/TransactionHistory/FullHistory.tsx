import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { useHistory } from 'utils/hooks';
import { router } from 'utils/routing';

import HistoryItem from './HistoryItem';

const FullHistoryScreen = () => {
	const history = useHistory();
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
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.navigate(-1)}>
					<ChevronLeft />
				</TouchableOpacity>
				<Text style={styles.title}>Transaction History</Text>
			</View>
			{loading ? (
				<Text>loading...</Text>
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
								<Text>{transactionDate}</Text>
								<HistoryItem {...transaction} />
							</View>
						);
					})}
				</View>
			)}
		</View>
	);
};

export default FullHistoryScreen;

const styles = StyleSheet.create({
	container: {},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 14,
		gap: 14,
	},
	title: {
		fontSize: 20,
		color: '#ffffff',
	},
	transactionsContainer: {
		paddingHorizontal: 14,
		gap: 8,
	},
	dateAndTransactionContainer: {
		gap: 10,
	},
});
