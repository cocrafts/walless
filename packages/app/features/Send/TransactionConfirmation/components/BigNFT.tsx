import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import { transactionContext } from '../../../../state/transaction';

export const BigNFT = () => {
	const { nftCollection, nftCollectible } = useSnapshot(transactionContext);

	const iconUri = { uri: nftCollectible?.metadata?.imageUri };

	return (
		<View style={styles.container}>
			<Image style={styles.tokenIcon} source={iconUri} />
			<View style={styles.titleContainer}>
				<Text style={styles.nftText}>{nftCollectible?.metadata?.name}</Text>
				<Text style={styles.collectionText}>
					{nftCollection?.metadata?.name}
				</Text>
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
