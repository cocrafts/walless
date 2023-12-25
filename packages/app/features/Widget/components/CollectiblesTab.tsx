import { type FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { utils } from '@walless/ioc';
import type { CollectionDocument } from '@walless/store';

import { useLazyGridLayout } from '../../../utils/hooks';

import CollectibleItem from './CollectibleItem';

interface Props {
	collections?: CollectionDocument[];
}

export const CollectiblesTab: FC<Props> = ({ collections = [] }) => {
	const { onGridContainerLayout, width } = useLazyGridLayout({
		referenceWidth: 156,
		gap: gridGap,
	});
	const handlePressItem = (ele: CollectionDocument) => {
		// TODO: navigate to nft
		const collectionId = ele._id.split('/')[2];
		utils.navigateToCollection(collectionId);
	};

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
			onLayout={(e) => onGridContainerLayout(e.nativeEvent.layout)}
		>
			{collections.length === 0 && (
				<View horizontal style={styles.emptyContainer}>
					<Text style={styles.emptyText}>You do not have any NFT yet</Text>
				</View>
			)}
			<View style={styles.contentContainer}>
				{width > 0 &&
					collections.map((ele, index) => (
						<CollectibleItem
							key={index}
							item={ele}
							collectibleCount={ele.count}
							onPress={() => handlePressItem(ele)}
							size={width}
						/>
					))}
			</View>
		</ScrollView>
	);
};

export default CollectiblesTab;

const gridGap = 18;
const styles = StyleSheet.create({
	container: {
		marginTop: 16,
		marginBottom: 32,
		borderRadius: 12,
		overflow: 'hidden',
	},
	contentContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: gridGap,
		overflow: 'hidden',
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
