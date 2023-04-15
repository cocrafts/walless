import { useState } from 'react';
import { ScrollView, Stack, Text } from '@walless/gui';

import { mockCollectibles } from '../../internal';
import SeeAllBtn from '../SeeAllBtn';

import CollectibleCard from './CollectibleCard';

const Collectibles = () => {
	const numberOfCollectibles = 8;

	const [activeCollectible, setActiveCollectible] = useState(
		mockCollectibles[0],
	);

	const handlePressSeeAll = () => {
		console.log('See All');
	};

	return (
		<Stack width="100%">
			<Stack
				marginBottom={16}
				display="flex"
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Text fontSize={18} fontWeight="500">
					NFT Collectibles ({numberOfCollectibles})
				</Text>
				<SeeAllBtn onPress={handlePressSeeAll} />
			</Stack>

			<ScrollView overflow="scroll">
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
		</Stack>
	);
};

export default Collectibles;
