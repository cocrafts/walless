import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import type { UnknownObject } from '@walless/core';
import { View } from '@walless/gui';
import CollectionCard from 'components/CollectionCard';
import { useLazyGridLayout, useNfts } from 'utils/hooks';
import { navigate, navigateBack } from 'utils/navigation';

export const CollectionScreen = () => {
	const { id } = useRoute().params as UnknownObject;

	const { nfts, collections } = useNfts();
	const { onGridContainerLayout, width } = useLazyGridLayout({
		referenceWidth: 150,
		gap: gridGap,
	});

	const collection = useMemo(() => {
		return collections.find((ele) => ele._id.includes(id as string));
	}, [collections, id]);

	const filteredNFTs = useMemo(() => {
		return nfts.filter((ele) => ele.collectionId === collection?._id);
	}, [nfts, collection]);

	const handleNavigateToCollectible = (id: string) => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Collection',
				params: { screen: 'NFT', params: { id } },
			},
		});
	};

	useFocusEffect(
		useCallback(() => {
			if (!collection) {
				navigateBack();
			}
		}, [collection]),
	);

	return (
		<View style={styles.container}>
			<View
				style={styles.collectiblesContainer}
				onLayout={(e) => onGridContainerLayout(e.nativeEvent.layout)}
			>
				{filteredNFTs.map((ele) => {
					const collectibleId = ele._id.split('/')[2];

					return (
						<CollectionCard
							key={ele._id}
							item={ele}
							size={width}
							onPress={() => handleNavigateToCollectible(collectibleId)}
						/>
					);
				})}
			</View>
		</View>
	);
};

export default CollectionScreen;

const gridGap = 18;
const styles = StyleSheet.create({
	container: {
		padding: 18,
		gap: 18,
	},
	backButton: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		marginTop: 2,
	},
	title: {
		fontSize: 18,
		color: '#FFFFFF',
	},
	collectiblesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: gridGap,
	},
});
