import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

import type { TokenTransactionContext } from '../internal';
import { useTransactionContext } from '../internal';

export const TotalCost: FC = () => {
	const { token, amount } = useTransactionContext<TokenTransactionContext>();

	const costStr = `${amount ? parseFloat(amount) : 0} ${token.symbol}`;

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>Total cost</Text>
			</View>

			<View style={styles.valueContainer}>
				<Text style={styles.costText}>{costStr}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		gap: 4,
	},
	titleText: {
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
		fontSize: 12,
		color: '#566674',
	},
});
