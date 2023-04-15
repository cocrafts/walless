import { FC, useState } from 'react';
import { Stack, Text } from '@walless/gui';

import LayoutCard from './components/LayoutCard';
import SearchBar from './components/SearchBar';
import { Layout, mockLayoutCards } from './internal';

const spacing = 12;

export const ExploreScreen: FC = () => {
	const [layouts, setLayouts] = useState<Layout[]>(mockLayoutCards);

	const handleSearch = (query: string) => {
		const filteredLayouts = mockLayoutCards.filter((layout) =>
			layout.name.toLowerCase().includes(query.toLowerCase()),
		);

		setLayouts(filteredLayouts);
	};

	const handleLovePress = (layout: Layout) => {
		console.log(layout);
	};

	const handleAddPress = (layout: Layout) => {
		console.log(layout);
	};

	return (
		<Stack gap={spacing} paddingHorizontal={spacing} paddingVertical={spacing}>
			<Text fontSize={20} lineHeight={26} fontWeight="500" textAlign="center">
				Choose a layout to start
			</Text>

			<SearchBar onSearch={handleSearch} />

			{layouts.map((layoutCard) => (
				<LayoutCard
					key={layoutCard.id}
					item={layoutCard}
					onLovePress={handleLovePress}
					onAddPress={handleAddPress}
				/>
			))}
		</Stack>
	);
};

export default ExploreScreen;
