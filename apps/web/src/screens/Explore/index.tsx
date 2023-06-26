import { type FC, useState } from 'react';
import { modalActions } from '@walless/gui';
import { modules } from '@walless/ioc';
import { type ExtensionDocument } from '@walless/store';
import { Stack, Text } from '@walless/ui';
import { extensionState } from 'state/extension';
import { router } from 'utils/routing';
import { useSnapshot } from 'valtio';

import LayoutCard from './components/LayoutCard';
import SearchBar from './components/SearchBar';
import { mockLayoutCards } from './internal';

const spacing = 12;

export const ExploreScreen: FC = () => {
	const [extensions, setExtensions] =
		useState<ExtensionDocument[]>(mockLayoutCards);
	const { map: installedMap } = useSnapshot(extensionState);

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
		console.log('add layout');
		await modules.storage.put(extension);
		await router.navigate(extension._id);
	};

	const handleRemoveLayout = async (extension: ExtensionDocument) => {
		modules.storage.removeDoc<ExtensionDocument>(extension._id);
		modalActions.destroy('remove-layout-modal');
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

			{extensions.map((layoutCard) => {
				const isAdded = !!installedMap.get(layoutCard._id);
				return (
					<LayoutCard
						key={layoutCard._id}
						item={layoutCard}
						onLovePress={handleLovePress}
						onAddPress={handleAddPress}
						onRemovePress={handleRemoveLayout}
						isAdded={isAdded}
					/>
				);
			})}
		</Stack>
	);
};

export default ExploreScreen;
