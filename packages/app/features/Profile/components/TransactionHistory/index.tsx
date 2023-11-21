import { type FC, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';

import { useHistory } from '../../../../utils/hooks';

import HistoryItem from './HistoryItem';

interface Props {
	onNavigateToHistory: () => void;
}

export const TransactionHistory: FC<Props> = ({ onNavigateToHistory }) => {
	const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		if (history.length > 0) {
			setIsLoading(false);
		}
	}, [history]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>History</Text>
				<Button style={styles.button} onPress={onNavigateToHistory}>
					<Text>See All</Text>
				</Button>
			</View>
			{isLoading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.transactionsContainer}>
					{history.slice(0, 3).map((transaction) => (
						<HistoryItem key={transaction.signature} {...transaction} />
					))}
				</View>
			)}
		</View>
	);
};

export default TransactionHistory;

export { FullHistoryFeature } from './FullHistory';

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
