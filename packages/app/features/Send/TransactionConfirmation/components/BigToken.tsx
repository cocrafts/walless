import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import { transactionContext } from '../../../../state/transaction';

export const BigToken = () => {
	const { token, amount } = useSnapshot(transactionContext);

	const iconUri = { uri: token?.metadata?.imageUri };

	return (
		<View style={styles.container}>
			<Image style={styles.tokenIcon} source={iconUri} />
			<View style={styles.amountContainer}>
				<Text style={styles.amountText}>{amount}</Text>
				<Text style={styles.symbolText}>{token?.metadata?.symbol}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%',
		gap: 11,
	},
	tokenIcon: {
		width: 100,
		height: 100,
	},
	amountContainer: {
		flexDirection: 'row',
		gap: 6,
	},
	amountText: {
		fontSize: 20,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	symbolText: {
		fontSize: 20,
		fontWeight: '500',
		color: '#566674',
	},
});
