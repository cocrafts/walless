import type { FC } from 'react';
import { View } from 'react-native';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSafeAreaInsets, useSnapshot, useWidgets } from '@walless/app';
import { DashboardNavigator } from '@walless/app/features/DashboardLayout/Navigator';
import { appState, mockWidgets, widgetActions } from '@walless/engine';
import type { WidgetDocument } from '@walless/store';
import { appActions } from 'state/app';

export const sidebarWidth = 64;

const IS_HARDCODED = true;

export const Sidebar: FC<DrawerContentComponentProps> = ({ navigation }) => {
	const { profile, activeWidgetId } = useSnapshot(appState);
	const widgets = useWidgets();

	const handleExtensionPress = (item: WidgetDocument) => {
		const id = item._id || 'Explore';
		appActions.setActiveWidgetRoute(id);
		navigation.navigate(id);
	};

	const handleRemoveWidget = async (widget: WidgetDocument) => {
		await widgetActions.removeWidget(widget);
		await navigation.navigate('Explore');
	};

	const getRouteActive = (item: WidgetDocument) => {
		return activeWidgetId === (item._id || 'Explore');
	};

	const { top } = useSafeAreaInsets();

	return (
		<View style={{ marginTop: top }}>
			<DashboardNavigator
				profile={profile}
				widgets={IS_HARDCODED ? mockWidgets : widgets}
				size={sidebarWidth}
				getIsExtensionActive={getRouteActive}
				onExtensionPress={handleExtensionPress}
				onRemoveLayout={handleRemoveWidget}
			/>
		</View>
	);
};

export default Sidebar;
