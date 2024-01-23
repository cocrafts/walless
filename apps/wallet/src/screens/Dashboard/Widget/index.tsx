import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import type { DrawerScreenProps } from 'components/DrawerNavigation';
import ExplorerFeature from 'features/Explorer';
import WidgetFeature from 'features/Widget';
import { mockWidgets } from 'state/widget';
import { useSettings } from 'utils/hooks';
import type { ExploreParamList } from 'utils/navigation';

type Props = DrawerScreenProps<ExploreParamList, 'Widget'>;

export const WidgetScreen: FC<Props> = ({ navigation, route }) => {
	const widgetId = route.params?.id;
	const { setPathname } = useSettings();

	useEffect(() => {
		setPathname(widgetId || 'explorer');
	}, [widgetId]);

	if (!widgetId || widgetId === 'explorer') {
		return (
			<ExplorerFeature
				style={styles.container}
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
			style={styles.container}
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
