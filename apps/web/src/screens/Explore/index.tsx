import { FC } from 'react';
import { Stack, Text } from '@walless/gui';

import LayoutCard from './components/LayoutCard';
import SearchBar from './components/SearchBar';
import { mockLayoutCards } from './internal';

export const ExploreScreen: FC = () => {
	const handleSearch = (value: string) => {
		console.log(value);
	};

	return (
		<Stack
			display="flex"
			alignItems="center"
			gap={24}
			paddingHorizontal={14}
			paddingVertical={20}
			maxHeight="100vh"
		>
			<Text fontSize={20} lineHeight={26} fontWeight="500">
				Choose a layout to start
			</Text>

			<SearchBar onSearch={handleSearch} />

			{mockLayoutCards.map((layoutCard) => (
				<LayoutCard
					key={layoutCard.id}
					id={layoutCard.id}
					name={layoutCard.name}
					description={layoutCard.description}
					thumbnail={layoutCard.thumbnail}
					logo={layoutCard.logo}
					loveCount={layoutCard.loveCount}
					isLoved={layoutCard.isLoved}
					activeUsers={layoutCard.activeUsers}
				/>
			))}
		</Stack>
	);
};

export default ExploreScreen;
