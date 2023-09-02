import type { FC } from 'react';
import { useState } from 'react';
import { mockWidgets, widgetState } from '@walless/engine';
import { modalActions } from '@walless/gui';
import { modules } from '@walless/ioc';
import type { WidgetDocument } from '@walless/store';
import { Stack, Text } from '@walless/ui';
import { router } from 'utils/routing';
import { useSnapshot } from 'valtio';

import LayoutCard from './components/LayoutCard';
import SearchBar from './components/SearchBar';

const spacing = 12;

export const ExploreScreen: FC = () => {
	const [extensions, setExtensions] = useState<WidgetDocument[]>(mockWidgets);
	const { map: installedMap } = useSnapshot(widgetState);

	const handleSearch = (query: string) => {
		const filteredLayouts = mockWidgets.filter((extension) =>
			extension.name.toLowerCase().includes(query.toLowerCase()),
		);

		setExtensions(filteredLayouts);
	};

	const handleLovePress = (widget: WidgetDocument) => {
		console.log(widget);
	};

	const handleAddLayout = async (widget: WidgetDocument) => {
		await modules.storage.put({
			...widget,
			timestamp: new Date().toISOString(),
		});
		await router.navigate(widget._id);
	};

	const handleRemoveLayout = async (widget: WidgetDocument) => {
		modules.storage.removeDoc(widget._id);
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
						onAddPress={handleAddLayout}
						onRemovePress={handleRemoveLayout}
						isAdded={isAdded}
					/>
				);
			})}
		</Stack>
	);
};

export default ExploreScreen;
