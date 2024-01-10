import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import assets from 'utils/assets';
import { useSnapshot } from 'valtio';

import { txContext } from '../context';

export const TokenHeader = () => {
	const { token, amount } = useSnapshot(txContext).tx;

	const iconUri = token?.metadata?.imageUri
		? { uri: token?.metadata?.imageUri }
		: assets.misc.unknownToken;

	return (
		<View style={styles.container}>
			<Image style={styles.tokenIcon} source={iconUri} />
			<View style={styles.amountContainer}>
				<Text style={styles.amountText}>{amount}</Text>
				<Text style={styles.symbolText}>
					{token?.metadata?.symbol || 'Unknown'}
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
