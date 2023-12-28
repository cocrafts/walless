import type { FC } from 'react';
import { useMemo } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ChevronLeft } from '@walless/icons';
import { utils } from '@walless/ioc';

import { useLazyGridLayout, useNfts } from '../utils/hooks';

import CollectibleItem from './Widget/components/CollectibleItem';

interface Props {
	id: string;
	style?: StyleProp<ViewStyle>;
}

export const CollectionFeat: FC<Props> = ({ id, style }) => {
	const { collections, collectibles } = useNfts();
	const { onGridContainerLayout, width } = useLazyGridLayout({
		referenceWidth: 156,
		gap: gridGap,
	});

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
		<View style={[styles.container, style]}>
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
						<CollectibleItem
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
		padding: 16,
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
