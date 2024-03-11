import { type FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import CollectionCard from 'components/CollectionCard';
import type { WrappedCollection } from 'utils/hooks';
import { useLazyGridLayout, useNfts } from 'utils/hooks';
import { navigate } from 'utils/navigation';

interface Props {
	network: Networks;
}

export const NftTab: FC<Props> = ({ network }) => {
	const { collections } = useNfts(network);
	const { onGridContainerLayout, width } = useLazyGridLayout({
		referenceWidth: 150,
		gap: gridGap,
	});

	const handlePressItem = (ele: WrappedCollection) => {
		const collectionId = ele._id.split('/')[2];

		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Collection',
				params: {
					screen: 'Default',
					params: { id: collectionId },
				},
			},
		});
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
					collections.map((ele, index) => {
						return (
							<CollectionCard
								key={index}
								item={ele}
								collectibleCount={ele.count}
								onPress={() => handlePressItem(ele)}
								size={width}
							/>
						);
					})}
			</View>
		</ScrollView>
	);
};

export default NftTab;

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
