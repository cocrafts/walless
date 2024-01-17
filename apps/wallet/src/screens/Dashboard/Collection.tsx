import type { FC } from 'react';
import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { View } from '@walless/gui';
import CollectionCard from 'components/CollectionCard';
import { useLazyGridLayout, useNfts, useSafeAreaInsets } from 'utils/hooks';
import { navigate } from 'utils/navigation';

export const CollectionFeat: FC = () => {
	const { collectibles } = useNfts();
	const { onGridContainerLayout, width } = useLazyGridLayout({
		referenceWidth: 156,
		gap: gridGap,
	});

	const {
		params: { id = '' },
	} = useRoute() as never;
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		marginTop: insets.top,
	};

	const curCollectibles = useMemo(() => {
		return collectibles.filter((ele) =>
			ele.collectionId.includes(id as string),
		);
	}, [collectibles]);

	const handleNavigateToCollectible = (id: string) => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: { screen: 'Collectible', params: { id } },
		});
	};

	return (
		<View style={[styles.container, containerStyle]}>
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
