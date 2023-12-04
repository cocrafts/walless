import type { FC } from 'react';
import { useEffect } from 'react';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useSnapshot, useWidgets } from '@walless/app';
import { DashboardNavigator } from '@walless/app';
import { appState, widgetActions } from '@walless/engine';
import { utils } from '@walless/ioc';
import type { WidgetDocument } from '@walless/store';
import { localActions } from 'utils/state';

export const sidebarWidth = 64;

export const Sidebar: FC<DrawerContentComponentProps> = ({ state }) => {
	const drawerStatus = useDrawerStatus();
	const { profile } = useSnapshot(appState);
	const widgets = useWidgets();

	useEffect(() => {
		localActions.setIsDrawOpen(drawerStatus === 'open');
	}, [drawerStatus]);

	const handleExtensionPress = (item: WidgetDocument) => {
		utils.navigateToWidget(item._id);
	};

	const handleRemoveWidget = async (widget: WidgetDocument) => {
		await widgetActions.removeWidget(widget);
	};

	const getActiveRoute = (item: WidgetDocument) => {
		const { routes, index } = state;
		const activeId = routes[index].params?.id ?? '';
		return activeId === item._id;
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
