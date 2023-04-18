import { useState } from 'react';
import { ScrollView, Stack, Text } from '@walless/ui';

import { mockCollectibles } from '../../internal';

import CollectibleCard from './CollectibleCard';

const Collectibles = () => {
	const numberOfCollectibles = 8;

	const [activeCollectible, setActiveCollectible] = useState(
		mockCollectibles[0],
	);

	return (
		<Stack width="100%">
			<Stack
				marginBottom={16}
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Text fontSize={18}>NFT Collectibles ({numberOfCollectibles})</Text>
			</Stack>

			{mockCollectibles.length === 0 ? (
				<Text textAlign="center" color="#566674">
					You don&apos;t have any NFTs yet
				</Text>
			) : (
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
				>
					<Stack display="flex" flexDirection="row" gap={10}>
						{mockCollectibles.map((collectible) => (
							<CollectibleCard
								key={collectible.id}
								collectible={collectible}
								isActive={collectible.id === activeCollectible.id}
								setActiveCollectible={setActiveCollectible}
							/>
						))}
					</Stack>
				</ScrollView>
			)}
		</Stack>
	);
};

export default Collectibles;
