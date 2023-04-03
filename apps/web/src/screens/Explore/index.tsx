import { FC } from 'react';
import { Stack, Text } from '@walless/gui';

import SearchBar from './SearchBar';
import LayoutCard from './LayoutCard';
import { mockLayoutCards } from './mock';

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
		>
			<Text fontSize={20} lineHeight={26} fontWeight="500">
				Choose a layout to start
			</Text>

			<SearchBar
				placeholder="Explore exciting project"
				onSearch={handleSearch}
			/>

			{mockLayoutCards.map((layoutCard) => (
				<LayoutCard
					key={layoutCard.id}
					id={layoutCard.id}
					name={layoutCard.name}
					description={layoutCard.description}
					thumbnail={layoutCard.thumbnail}
					logo={layoutCard.logo}
					loveCount={layoutCard.loveCount}
					activeUsers={layoutCard.activeUsers}
				/>
			))}
		</Stack>
	);
};

export default ExploreScreen;
