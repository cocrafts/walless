import { FC } from 'react';
import { Stack, Text } from '@walless/gui';

import LayoutCard from './components/LayoutCard';
import SearchBar from './components/SearchBar';
import { Layout, mockLayoutCards } from './internal';

export const ExploreScreen: FC = () => {
	const handleSearch = (value: string) => {
		console.log(value);
	};

	const handlePressLoveBtn = (layout: Layout) => {
		console.log(layout);
	};

	return (
		<Stack gap={18} paddingHorizontal={14} paddingVertical={20}>
			<Text fontSize={20} lineHeight={26} fontWeight="500" textAlign="center">
				Choose a layout to start
			</Text>

			<SearchBar onSearch={handleSearch} />

			{mockLayoutCards.map((layoutCard) => (
				<LayoutCard
					key={layoutCard.id}
					item={layoutCard}
					onPressLoveBtn={handlePressLoveBtn}
				/>
			))}
		</Stack>
	);
};

export default ExploreScreen;
