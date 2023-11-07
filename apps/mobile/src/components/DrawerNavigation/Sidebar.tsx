import { type FC, useEffect } from 'react';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSnapshot, useWidgets } from '@walless/app';
import { DashboardNavigator } from '@walless/app/features/DashboardLayout/Navigator';
import { appState, mockWidgets, widgetActions } from '@walless/engine';
import type { WidgetDocument } from '@walless/store';
import { appActions } from 'state/app';

export const sidebarWidth = 64;

const IS_HARDCODED = true;

export const Sidebar: FC<DrawerContentComponentProps> = ({ navigation }) => {
	const { profile, activeWidgetId } = useSnapshot(appState);
	const widgets = useWidgets();

	useEffect(() => {
		navigation.openDrawer();
	}, []);

	const handleExtensionPress = (item: WidgetDocument) => {
		if (item._id) {
			appActions.setActiveWidget(item._id);
			navigation.navigate('Widget');
		} else {
			navigation.navigate('Explore');
		}
	};

	const handleRemoveWidget = async (widget: WidgetDocument) => {
		await widgetActions.removeWidget(widget);
		await navigation.navigate('Explore');
	};

	const getActiveRoute = (item: WidgetDocument) => {
		return activeWidgetId === item._id;
	};

	return (
		<DashboardNavigator
			profile={profile}
			widgets={IS_HARDCODED ? mockWidgets : widgets}
			size={sidebarWidth}
			getIsExtensionActive={getActiveRoute}
			onExtensionPress={handleExtensionPress}
			onRemoveLayout={handleRemoveWidget}
		/>
	);
};

export default Sidebar;
