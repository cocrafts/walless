import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { utils } from '@walless/ioc';
import type { CollectionDocument } from '@walless/store';

import CollectibleItem from './CollectibleItem';

interface Props {
	collections?: CollectionDocument[];
}

export const CollectiblesTab: FC<Props> = ({ collections = [] }) => {
	const handlePressItem = (ele: CollectionDocument) => {
		// TODO: navigate to nft
		const collectionId = ele._id.split('/')[2];
		utils.navigateToCollection(collectionId);
	};

	return (
		<View style={styles.container}>
			{collections.length === 0 && (
				<View horizontal style={styles.emptyContainer}>
					<Text style={styles.emptyText}>You do not have any NFT yet</Text>
				</View>
			)}
			{collections.map((ele, index) => (
				<CollectibleItem
					key={index}
					item={ele}
					collectibleCount={ele.count}
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
		gap: 14,
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
