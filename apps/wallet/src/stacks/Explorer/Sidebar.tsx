import type { FC } from 'react';
import { useEffect } from 'react';
import type { WidgetDocument } from '@walless/store';
import type { DrawerContentComponentProps } from 'components/DrawerNavigation';
import { useDrawerStatus } from 'components/DrawerNavigation';
import { appState } from 'state/app';
import { runtimeActions } from 'state/runtime';
import { widgetActions } from 'state/widget';
import { useSnapshot, useWidgets } from 'utils/hooks';
import { navigate } from 'utils/navigation';

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
		navigate('Dashboard', {
			screen: 'Explore',
			params: { screen: 'Widget', params: { id: item._id } },
		});
	};

	const handleRemoveWidget = async (widget: WidgetDocument) => {
		await widgetActions.removeWidget(widget);
		navigate('Dashboard', {
			screen: 'Explore',
			params: { screen: 'Widget', params: { id: '' } },
		});
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
