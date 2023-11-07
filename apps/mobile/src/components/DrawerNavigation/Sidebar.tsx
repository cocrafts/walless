import { type FC, useEffect } from 'react';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useSnapshot } from '@walless/app';
import { DashboardNavigator } from '@walless/app/features/DashboardLayout/Navigator';
import { appState, mockWidgets, widgetActions } from '@walless/engine';
import type { WidgetDocument } from '@walless/store';
import { appActions } from 'state/app';

export const sidebarWidth = 64;

export const Sidebar: FC<DrawerContentComponentProps> = ({ navigation }) => {
	const { profile, activeWidgetId } = useSnapshot(appState);

	const isDrawerOpen = useDrawerStatus() === 'open';

	useEffect(() => {
		appActions.setIsDrawerOpen(isDrawerOpen);
	}, [isDrawerOpen]);

	const handleExtensionPress = (item: WidgetDocument) => {
		appActions.setActiveWidget(item._id);
	};

	const handleRemoveWidget = async (widget: WidgetDocument) => {
		await widgetActions.removeWidget(widget);
		await navigation.navigate('');
	};

	const getActiveRoute = (item: WidgetDocument) => {
		return activeWidgetId === item._id;
	};

	return (
		<DashboardNavigator
			profile={profile}
			widgets={mockWidgets}
			size={sidebarWidth}
			getIsExtensionActive={getActiveRoute}
			onExtensionPress={handleExtensionPress}
			onRemoveLayout={handleRemoveWidget}
		/>
	);
};

export default Sidebar;
