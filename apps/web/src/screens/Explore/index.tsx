import { FC, useState } from 'react';
import { ExtensionDocument } from '@walless/store';
import { Stack, Text } from '@walless/ui';
import { db } from 'utils/pouch';
import { router } from 'utils/routing';

import LayoutCard from './components/LayoutCard';
import SearchBar from './components/SearchBar';
import { mockLayoutCards } from './internal';

const spacing = 12;

export const ExploreScreen: FC = () => {
	const [extensions, setExtensions] =
		useState<ExtensionDocument[]>(mockLayoutCards);

	const handleSearch = (query: string) => {
		const filteredLayouts = mockLayoutCards.filter((extension) =>
			extension.name.toLowerCase().includes(query.toLowerCase()),
		);

		setExtensions(filteredLayouts);
	};

	const handleLovePress = (extension: ExtensionDocument) => {
		console.log(extension);
	};

	const handleAddPress = async (extension: ExtensionDocument) => {
		await db.put(extension);
		await router.navigate(extension._id);
	};

	return (
		<Stack gap={spacing} paddingHorizontal={spacing} paddingVertical={spacing}>
			<Text fontSize={20} lineHeight={26} fontWeight="500" textAlign="center">
				Choose a layout to start
			</Text>

			<SearchBar onSearch={handleSearch} />

			{extensions.map((layoutCard) => (
				<LayoutCard
					key={layoutCard._id}
					item={layoutCard}
					onLovePress={handleLovePress}
					onAddPress={handleAddPress}
				/>
			))}
		</Stack>
	);
};

export default ExploreScreen;
