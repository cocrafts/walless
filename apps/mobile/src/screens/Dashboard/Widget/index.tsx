import type { FC } from 'react';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import { ExplorerFeature, StackHeader, WidgetFeature } from '@walless/app';
import type { ExploreParamList } from 'utils/navigation';

type Props = DrawerScreenProps<ExploreParamList, 'Widget'>;

export const WidgetScreen: FC<Props> = ({ navigation, route }) => {
	const widgetId = route.params?.id;

	if (widgetId === 'explorer') {
		return (
			<ExplorerFeature
				headerComponent={StackHeader}
				onToggleDrawer={navigation.toggleDrawer}
			/>
		);
	}

	return (
		<WidgetFeature
			id={widgetId as string}
			headerComponent={StackHeader}
			onToggleDrawer={navigation.toggleDrawer}
		/>
	);
};

export default WidgetScreen;
