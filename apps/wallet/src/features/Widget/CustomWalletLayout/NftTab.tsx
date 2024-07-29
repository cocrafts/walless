import type { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import type { CustomWalletAssets, Networks } from '@walless/core';
import { Text, View } from '@walless/gui';
import CollectionCard from 'components/CollectionCard';
import { useLazyGridLayout, useNfts } from 'utils/hooks';
import { navigate } from 'utils/navigation';
import { filterAssetsFromCustomWalletTokens } from 'utils/widget';

interface Props {
	network: Networks;
	requiredNfts?: CustomWalletAssets[];
}

export const NftTab: FC<Props> = ({ network, requiredNfts }) => {
	const { nfts } = useNfts(network);
	const { onGridContainerLayout, width } = useLazyGridLayout({
		referenceWidth: 150,
		gap: gridGap,
	});

	const handleNavigateToCollectible = (id: string) => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Collection',
				params: { screen: 'NFT', params: { id } },
			},
		});
	};

	const filteredNfts = filterAssetsFromCustomWalletTokens(requiredNfts || [], {
		ownedNfts: nfts,
	});

	return (
		<ScrollView
			style={styles.container}
			showsVerticalScrollIndicator={false}
			onLayout={(e) => onGridContainerLayout(e.nativeEvent.layout)}
		>
			{filteredNfts.length === 0 && (
				<View horizontal style={styles.emptyContainer}>
					<Text style={styles.emptyText}>You do not have any NFT yet</Text>
				</View>
			)}
			<View style={styles.contentContainer}>
				{width > 0 &&
					filteredNfts &&
					filteredNfts.map((ele, index) => {
						const collectibleId = ele._id.split('/')[2];
						return (
							<CollectionCard
								key={index}
								item={ele}
								onPress={() => handleNavigateToCollectible(collectibleId)}
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
		minHeight: 300,
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
