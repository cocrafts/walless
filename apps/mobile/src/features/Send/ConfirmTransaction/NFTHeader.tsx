import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import { txContext } from '../context';

export const NFTHeader = () => {
	const { collection, collectible } = useSnapshot(txContext).tx;

	const iconUri = { uri: collection?.metadata?.imageUri };

	return (
		<View style={styles.container}>
			<Image style={styles.tokenIcon} source={iconUri} />
			<View style={styles.titleContainer}>
				<Text style={styles.nftText}>{collectible?.metadata?.name}</Text>
				<Text style={styles.collectionText}>{collection?.metadata?.name}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		gap: 11,
		alignItems: 'center',
	},
	tokenIcon: {
		width: 120,
		height: 120,
		borderRadius: 8,
	},
	titleContainer: {
		alignItems: 'center',
	},
	nftText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	collectionText: {
		fontSize: 12,
		color: '#566674',
	},
});
