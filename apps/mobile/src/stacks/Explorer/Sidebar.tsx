import type { FC } from 'react';
import { useEffect } from 'react';
import { useResponsive, useSnapshot, useWidgets } from '@walless/app';
import { DashboardNavigator } from '@walless/app';
import { appState, widgetActions } from '@walless/engine';
import { utils } from '@walless/ioc';
import type { WidgetDocument } from '@walless/store';
import type { DrawerContentComponentProps } from 'components/DrawerNavigation';
import { useDrawerStatus } from 'components/DrawerNavigation';
import { localActions } from 'state/local';

export const getSidebarWidth = (isMobileResponsive: boolean) => {
	return isMobileResponsive ? 64 : 58;
};

export const Sidebar: FC<DrawerContentComponentProps> = ({ state }) => {
	const { isMobileResponsive } = useResponsive();
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

	const getIsExtensionActive = (item: WidgetDocument) => {
		const { routes, index } = state;
		const params: { id?: string } = routes[index]?.params || {};
		const activeId = params?.id ?? '';
		return activeId === item._id;
	};

	return (
		<DashboardNavigator
			profile={profile}
			widgets={widgets}
			size={getSidebarWidth(isMobileResponsive)}
			getIsExtensionActive={getIsExtensionActive}
			onExtensionPress={handleExtensionPress}
			onRemoveLayout={handleRemoveWidget}
		/>
	);
};

export default Sidebar;
