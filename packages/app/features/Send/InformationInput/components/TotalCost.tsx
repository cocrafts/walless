import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import { transactionContext } from '../../../../state/transaction';

export const TotalCost: FC = () => {
	const { token, amount } = useSnapshot(transactionContext);

	const costStr = `${amount ? parseFloat(amount) : 0} ${
		token?.metadata?.symbol || ''
	}`;

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
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginVertical: 10,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		gap: 4,
	},
	titleText: {
		fontWeight: '400',
		fontSize: 14,
		color: '#EEEEEE',
	},
	valueContainer: {
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
