import { type FC, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { utils } from '@walless/ioc';
import type { CollectionDocument } from '@walless/store';
import { useDebouncedCallback } from 'use-debounce';

import CollectibleItem from './CollectibleItem';

interface Props {
	collections?: CollectionDocument[];
}

const GAP = 9;
const MEDIUM_SIZE = 400;

export const CollectiblesTab: FC<Props> = ({ collections = [] }) => {
	const [itemWidth, setItemWidth] = useState<number>(148);
	const handlePressItem = (ele: CollectionDocument) => {
		// TODO: navigate to nft
		const collectionId = ele._id.split('/')[2];
		utils.navigateToCollection(collectionId);
	};

	const onContainerLayout = useDebouncedCallback(
		({ nativeEvent }: LayoutChangeEvent) => {
			let nextItemWidth = nativeEvent.layout.width / 2 - GAP;
			if (nativeEvent.layout.width > MEDIUM_SIZE) {
				nextItemWidth = nativeEvent.layout.width / 3 - GAP;
			}

			if (nextItemWidth !== itemWidth || itemWidth === undefined) {
				setItemWidth(nextItemWidth);
			}
		},
		200,
	);

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			onLayout={onContainerLayout}
		>
			{collections.length === 0 && (
				<View horizontal style={styles.emptyContainer}>
					<Text style={styles.emptyText}>You do not have any NFT yet</Text>
				</View>
			)}
			<View style={styles.container}>
				{itemWidth &&
					collections.map((ele, index) => (
						<CollectibleItem
							key={index}
							item={ele}
							collectibleCount={ele.count}
							onPress={() => handlePressItem(ele)}
							size={itemWidth}
						/>
					))}
			</View>
		</ScrollView>
	);
};

export default CollectiblesTab;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 20,
		paddingTop: 16,
		paddingBottom: 60,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	emptyText: {
		marginTop: 120,
		fontSize: 13,
		color: '#566674',
	},
});
