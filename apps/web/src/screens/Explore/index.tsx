import { type FC, useState } from 'react';
import { modules } from '@walless/ioc';
import { type ExtensionDocument } from '@walless/store';
import { Stack, Text } from '@walless/ui';
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
		await modules.storage.put(extension);
		await router.navigate(extension._id);
	};

	return (
		<Stack
			gap={spacing + 8}
			paddingHorizontal={spacing}
			paddingVertical={spacing}
		>
			<Stack gap={spacing * 2} paddingTop={spacing}>
				<Text fontSize={20} lineHeight={26} textAlign="center">
					Choose a layout to start
				</Text>

				<SearchBar onSearch={handleSearch} />
			</Stack>

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
