import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ExplorerFeature } from '@walless/app';
import { mockWidgets } from '@walless/engine';
import type { DrawerScreenProps } from 'components/DrawerNavigation';
import { StackHeader } from 'components/StackContainer';
import { WidgetFeature } from 'features/Widget';
import type { ExploreParamList } from 'utils/navigation';

type Props = DrawerScreenProps<ExploreParamList, 'Widget'>;

export const WidgetScreen: FC<Props> = ({ navigation, route }) => {
	const widgetId = route.params?.id;

	if (!widgetId || widgetId === 'explorer') {
		return (
			<ExplorerFeature
				headerComponent={StackHeader}
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
