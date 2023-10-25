import { type FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import type { CollectionDocument } from '@walless/store';

import { useNfts } from '../../../utils/hooks';

import CollectibleItem from './CollectibleItem';

interface Props {
	collections?: CollectionDocument[];
}

export const CollectiblesTab: FC<Props> = ({ collections = [] }) => {
	const handlePressItem = (ele: CollectionDocument) => {
		// TODO: navigate to nft
		console.log(ele._id);
	};

	const { collectibles } = useNfts();

	const countCollectibles = useMemo(
		() =>
			collections.map(
				(ele) =>
					collectibles.filter(
						(collectible) => collectible.collectionId === ele._id,
					).length,
			),
		[collectibles, collections],
	);

	return (
		<View style={styles.container}>
			{collections.map((ele, index) => (
				<CollectibleItem
					key={index}
					item={ele}
					collectibleCount={countCollectibles[index]}
					onPress={() => handlePressItem(ele)}
				/>
			))}
		</View>
	);
};

export default CollectiblesTab;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 10,
		paddingTop: 10,
		paddingBottom: 60,
	},
});
