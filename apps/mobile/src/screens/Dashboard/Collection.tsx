import type { FC } from 'react';
import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Hoverable, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { utils } from '@walless/ioc';
import NftCard from 'components/NftCard';
import { useLazyGridLayout, useNfts, useSafeAreaInsets } from 'utils/hooks';

export const CollectionFeat: FC = () => {
	const { collections, collectibles } = useNfts();
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

	const curCollection = useMemo(() => {
		return collections.find((ele) => ele._id.includes(id as string));
	}, [collections]);

	const curCollectibles = useMemo(() => {
		return collectibles.filter((ele) =>
			ele.collectionId.includes(id as string),
		);
	}, [collectibles]);

	const handleNavigateToCollectible = (id: string) => {
		utils.navigateToCollectible(id);
	};

	const handleGoBack = () => {
		utils.navigateBack();
	};

	return (
		<View style={[styles.container, containerStyle]}>
			<Hoverable style={styles.backButton} onPress={handleGoBack}>
				<ChevronLeft size={16} />
				<Text style={styles.title}>
					{`${curCollection?.metadata?.name} (${curCollection?.count})` ||
						'Unknown collection'}
				</Text>
			</Hoverable>
			<View
				style={styles.collectiblesContainer}
				onLayout={(e) => onGridContainerLayout(e.nativeEvent.layout)}
			>
				{curCollectibles.map((ele) => {
					const collectibleId = ele._id.split('/')[2];

					return (
						<NftCard
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
