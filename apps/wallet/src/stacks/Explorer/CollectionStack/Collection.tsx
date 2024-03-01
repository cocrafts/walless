import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import type { UnknownObject } from '@walless/core';
import { View } from '@walless/gui';
import CollectionCard from 'components/CollectionCard';
import { useLazyGridLayout, useNfts } from 'utils/hooks';
import { navigate, navigateBack } from 'utils/navigation';

export const CollectionFeat = () => {
	const { collectibles, collections } = useNfts();
	const { onGridContainerLayout, width } = useLazyGridLayout({
		referenceWidth: 156,
		gap: gridGap,
	});

	const id = (useRoute().params as UnknownObject)?.id;

	const curCollectibles = useMemo(() => {
		return collectibles.filter((ele) =>
			ele.collectionId.includes(id as string),
		);
	}, [collectibles, id]);

	const curCollection = useMemo(() => {
		return collections.find((ele) => ele._id.includes(id as string));
	}, [collections, id]);

	const handleNavigateToCollectible = (id: string) => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Collection',
				params: {
					screen: 'Collectible',
					params: { id },
				},
			},
		});
	};

	useFocusEffect(
		useCallback(() => {
			if (!curCollection) {
				navigateBack();
			}
		}, [curCollection]),
	);

	return (
		<View style={styles.container}>
			<View
				style={styles.collectiblesContainer}
				onLayout={(e) => onGridContainerLayout(e.nativeEvent.layout)}
			>
				{curCollectibles.map((ele) => {
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

export default CollectionFeat;

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
