import type { FC } from 'react';
import { useEffect } from 'react';
import { appState, widgetActions } from '@walless/engine';
import type { WidgetDocument } from '@walless/store';
import type { DrawerContentComponentProps } from 'components/DrawerNavigation';
import { useDrawerStatus } from 'components/DrawerNavigation';
import { runtimeActions } from 'state/runtime';
import { useSnapshot, useWidgets } from 'utils/hooks';
import { navigateToWidget } from 'utils/navigation';

import WidgetNavigator from './WidgetNavigator';

export const sidebarWidth = 64;

export const Sidebar: FC<DrawerContentComponentProps> = ({ state }) => {
	const drawerStatus = useDrawerStatus();
	const { profile } = useSnapshot(appState);
	const widgets = useWidgets();

	useEffect(() => {
		runtimeActions.toggleDrawer(drawerStatus === 'open');
	}, [drawerStatus]);

	const handleExtensionPress = (item: WidgetDocument) => {
		navigateToWidget(item._id);
	};

	const handleRemoveWidget = async (widget: WidgetDocument) => {
		await widgetActions.removeWidget(widget);
	};

	const getIsExtensionActive = (item: WidgetDocument) => {
		const { routes, index } = state;
		const params: { id?: string } = routes[index]?.params || {};
		const activeId = params?.id ?? '';
		return activeId === item._id;
	};

	return (
		<WidgetNavigator
			profile={profile}
			widgets={widgets}
			size={sidebarWidth}
			getIsExtensionActive={getIsExtensionActive}
			onExtensionPress={handleExtensionPress}
			onRemoveLayout={handleRemoveWidget}
		/>
	);
};

export default Sidebar;
