import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import { transactionContext } from '../../../../state/transaction';

const Balance = () => {
	const { token } = useSnapshot(transactionContext);
	const balanceString = `${
		parseFloat(token?.account.balance ?? '0') /
		10 ** (token?.account.decimals ?? 0)
	} ${token?.metadata?.symbol ?? ''}`;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Balance</Text>
			<Text style={styles.balance}>{balanceString}</Text>
		</View>
	);
};

export default Balance;

const styles = StyleSheet.create({
	container: {
		marginTop: -20,
		marginBottom: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		color: '#566674',
	},
	balance: {
		color: '#FFFFFF',
	},
});
