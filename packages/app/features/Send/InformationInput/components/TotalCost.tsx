import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import { transactionContext } from '../../../../state/transaction';

export const TotalCost = () => {
	const { token, amount } = useSnapshot(transactionContext);

	const costStr = `${amount} ${token?.metadata?.symbol || ''}`;

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>Total cost</Text>
			</View>

			<View style={styles.valueContainer}>
				<Text style={styles.costText}>{costStr}</Text>
				<Text style={styles.equalText}>~ 0 secs</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginVertical: 10,
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
	},
	titleText: {
		fontWeight: '400',
		fontSize: 14,
		color: '#EEEEEE',
	},
	valueContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'flex-end',
		gap: 4,
	},
	costText: {
		fontWeight: '500',
		fontSize: 18,
		color: '#FFFFFF',
	},
	equalText: {
		fontWeight: '400',
		fontSize: 12,
		color: '#566674',
	},
});
