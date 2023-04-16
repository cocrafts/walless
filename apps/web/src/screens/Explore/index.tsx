import { FC, useState } from 'react';
import { Stack, Text } from '@walless/gui';
import { ExtensionRecord } from '@walless/storage';

import LayoutCard from './components/LayoutCard';
import SearchBar from './components/SearchBar';
import { mockLayoutCards } from './internal';

const spacing = 12;

export const ExploreScreen: FC = () => {
	const [extensions, setExtensions] =
		useState<ExtensionRecord[]>(mockLayoutCards);

	const handleSearch = (query: string) => {
		const filteredLayouts = mockLayoutCards.filter((extension) =>
			extension.name.toLowerCase().includes(query.toLowerCase()),
		);

		setExtensions(filteredLayouts);
	};

	const handleLovePress = (extension: ExtensionRecord) => {
		console.log(extension);
	};

	const handleAddPress = (extension: ExtensionRecord) => {
		console.log(extension);
	};

	return (
		<Stack gap={spacing} paddingHorizontal={spacing} paddingVertical={spacing}>
			<Text fontSize={20} lineHeight={26} fontWeight="500" textAlign="center">
				Choose a layout to start
			</Text>

			<SearchBar onSearch={handleSearch} />

			{extensions.map((layoutCard) => (
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
