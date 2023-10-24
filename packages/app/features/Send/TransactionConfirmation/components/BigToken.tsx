import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import { transactionContext } from '../../../../state/transaction';

export const BigToken = () => {
	const { token, amount } = useSnapshot(transactionContext);

	const iconUri = {
		uri: token?.metadata?.imageUri ?? '/img/send-token/unknown-token.jpeg',
	};

	return (
		<View style={styles.container}>
			<Image style={styles.tokenIcon} source={iconUri} />
			<View style={styles.amountContainer}>
				<Text style={styles.amountText}>{amount}</Text>
				<Text style={styles.symbolText}>
					{token?.metadata?.symbol ?? 'Unknown'}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 11,
	},
	tokenIcon: {
		width: 100,
		height: 100,
		borderRadius: 1000,
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
		color: '#ffffff',
	},
});
