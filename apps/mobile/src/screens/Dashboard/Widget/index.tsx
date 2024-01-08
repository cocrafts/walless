import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { ExplorerFeature } from '@walless/app';
import { mockWidgets } from '@walless/engine';
import type { DrawerScreenProps } from 'components/DrawerNavigation';
import { StackHeader } from 'screens/Dashboard/Widget/components/StackContainer';
import { useSafeAreaInsets } from 'utils/hooks/aliased';
import type { ExploreParamList } from 'utils/navigation';

import { extractWidgetComponent } from './shared';

type Props = DrawerScreenProps<ExploreParamList, 'Widget'>;

export const WidgetScreen: FC<Props> = ({ navigation, route }) => {
	const insets = useSafeAreaInsets();
	const scrollOffset = useSharedValue(60);

	const widgetId = route.params?.id;

	if (!widgetId || widgetId === 'explorer') {
		return (
			<ExplorerFeature
				headerComponent={StackHeader}
				onToggleDrawer={navigation.toggleDrawer}
			/>
		);
	}

	const WidgetComponent = extractWidgetComponent(widgetId);
	const widgetName =
		mockWidgets.find((i) => i._id === widgetId)?.name || 'Unknown';

	const headerElement = (
		<StackHeader
			onToggleDrawer={navigation.toggleDrawer}
			title={widgetName}
			insets={insets}
			scrollOffset={scrollOffset}
		/>
	);

	return (
		<View style={styles.container}>
			{headerElement}
			<WidgetComponent id={widgetId} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default WidgetScreen;
