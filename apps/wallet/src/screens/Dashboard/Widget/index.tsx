import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { DrawerScreenProps } from 'components/DrawerNavigation';
import ExplorerFeature from 'features/Explorer';
import WidgetFeature from 'features/Widget';
import { appState } from 'state/app';
import { mockWidgets } from 'state/widget';
import { useSnapshot } from 'utils/hooks';
import type { ExploreParamList } from 'utils/navigation';

type Props = DrawerScreenProps<ExploreParamList, 'Widget'>;

export const WidgetScreen: FC<Props> = ({ navigation, route }) => {
	const { navigationDisplay } = useSnapshot(appState);
	const widgetId = route.params?.id;

	if (!widgetId || widgetId === 'explorer') {
		return (
			<ExplorerFeature
				style={styles.container}
				headerActive={navigationDisplay.isNavigationHeaderActive}
				onToggleDrawer={navigation.toggleDrawer}
			/>
		);
	}

	const widgetName =
		mockWidgets.find((i) => i._id === widgetId)?.name || 'Unknown';

	return (
		<WidgetFeature
			widgetId={widgetId}
			title={widgetName}
			headerActive={navigationDisplay.isNavigationHeaderActive}
			onToggleDrawer={navigation.toggleDrawer}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default WidgetScreen;
