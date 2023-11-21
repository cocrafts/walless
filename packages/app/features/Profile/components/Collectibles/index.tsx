import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

import { mockCollectibles } from '../../internal';

import CollectibleCard from './CollectibleCard';

const Collectibles = () => {
	const [activeCollectible, setActiveCollectible] = useState(
		mockCollectibles[0],
	);

	return (
		<View style={styles.container}>
			<Text style={styles.nftTitle}>
				NFT Collectibles ({mockCollectibles.length})
			</Text>

			{mockCollectibles.length === 0 ? (
				<Text style={styles.nonNftText}>You don&apos;t have any NFTs yet</Text>
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.cardsContainer}
				>
					{mockCollectibles.map((collectible) => (
						<CollectibleCard
							key={collectible.id}
							collectible={collectible}
							isActive={collectible.id === activeCollectible.id}
							setActiveCollectible={setActiveCollectible}
						/>
					))}
				</ScrollView>
			)}
		</View>
	);
};

export default Collectibles;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		gap: 10,
	},
	nftTitle: {
		fontSize: 18,
	},
	nonNftText: {
		textAlign: 'center',
		color: '#566674',
	},
	cardsContainer: {
		flexDirection: 'row',
		gap: 10,
	},
});
