import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { SolanaCollectible, UnknownObject } from '@walless/core';
import { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import type { NftDocument } from '@walless/store';
import type { WrappedCollection } from 'utils/hooks';
import { useNfts } from 'utils/hooks';
import { navigateBack } from 'utils/navigation';

import SolanaCollectibleScreen from './SolanaCollectible';

export const NFTScreen = () => {
	const [collection, setCollection] = useState<WrappedCollection>();
	const { collections, nfts } = useNfts();

	const { id } = useRoute().params as UnknownObject;

	const nft = useMemo(() => {
		if (!id) return;
		return nfts.find((ele) => ele._id.includes(id));
	}, [nfts, id]);

	useEffect(() => {
		if (!nft) {
			navigateBack();
			return;
		}

		const collection = collections.find((ele) => ele._id === nft.collectionId);
		setCollection(collection);
	}, [nft, collections]);

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.scrollContentContainer}
				showsVerticalScrollIndicator={false}
			>
				{!nft ? (
					<Text>Not found</Text>
				) : (
					nft.network === Networks.solana && (
						<SolanaCollectibleScreen
							collectible={nft as NftDocument<SolanaCollectible>}
							collection={collection}
						/>
					)
				)}
			</ScrollView>
		</View>
	);
};

export default NFTScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 18,
		paddingBottom: 0,
		gap: 18,
	},
	scrollContentContainer: {
		paddingBottom: 50,
	},
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 2,
		gap: 6,
	},
	title: {
		fontSize: 18,
		color: '#FFFFFF',
	},
});
