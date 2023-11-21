import type { FC } from 'react';
import { useEffect } from 'react';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useSnapshot, useWidgets } from '@walless/app';
import { DashboardNavigator } from '@walless/app';
import { appState, widgetActions } from '@walless/engine';
import type { WidgetDocument } from '@walless/store';
import { appActions, localActions } from 'utils/state';

export const sidebarWidth = 64;

export const Sidebar: FC<DrawerContentComponentProps> = () => {
	const drawerStatus = useDrawerStatus();
	const { profile, activeWidgetId } = useSnapshot(appState);
	const widgets = useWidgets();

	useEffect(() => {
		localActions.setIsDrawOpen(drawerStatus === 'open');
	}, [drawerStatus]);

	const handleExtensionPress = (item: WidgetDocument) => {
		appActions.setActiveWidget(item._id);
	};

	const handleRemoveWidget = async (widget: WidgetDocument) => {
		await widgetActions.removeWidget(widget);
	};

	const getActiveRoute = (item: WidgetDocument) => {
		return activeWidgetId === item._id;
	};

	return (
		<DashboardNavigator
			profile={profile}
			widgets={widgets}
			size={sidebarWidth}
			getIsExtensionActive={getActiveRoute}
			onExtensionPress={handleExtensionPress}
			onRemoveLayout={handleRemoveWidget}
		/>
	);
};

export default Sidebar;
