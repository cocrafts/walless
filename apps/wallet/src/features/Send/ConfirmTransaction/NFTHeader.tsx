import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

import { useTransactionContext } from '../internal';

import type { FulfilledNftTransaction } from './internal';

export const NFTHeader = () => {
	const { nft, collection } = useTransactionContext<FulfilledNftTransaction>();
	const iconUri = { uri: nft.image };

	return (
		<View style={styles.container}>
			<Image style={styles.tokenIcon} source={iconUri} />
			<View style={styles.titleContainer}>
				<Text style={styles.nftText}>{nft.name}</Text>
				<Text style={styles.collectionText}>{collection.name}</Text>
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
