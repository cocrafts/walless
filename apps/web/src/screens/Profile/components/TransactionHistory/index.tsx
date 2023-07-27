import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { mockHistory } from 'screens/Profile/internal';

import HistoryItem from './HistoryItem';

const TransactionHistory = () => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>History</Text>
				<Button style={styles.button}>
					<Text>See All</Text>
				</Button>
			</View>
			{mockHistory.length === 0 ? (
				<Text>You haven&apos;t had any transaction yet</Text>
			) : (
				<View style={styles.transactionsContainer}>
					{mockHistory.map((item) => (
						<HistoryItem key={item.id} {...item} />
					))}
				</View>
			)}
		</View>
	);
};

export default TransactionHistory;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		gap: 16,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 20,
		color: '#ffffff',
	},
	transactionsContainer: {
		gap: 8,
	},
	button: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: '#566674',
	},
});
