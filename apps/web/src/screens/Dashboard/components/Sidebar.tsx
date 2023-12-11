import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { DashboardNavigator, useResponsive } from '@walless/app';
import { appState, widgetActions } from '@walless/engine';
import type { WidgetDocument } from '@walless/store';
import { useLocation, useParams, useSnapshot, useWidgets } from 'utils/hooks';
import { router } from 'utils/routing';

export const Navigator: FC = () => {
	const { id: extensionId } = useParams<'id'>();
	const { isMobileResponsive } = useResponsive();
	const { pathname } = useLocation();
	const { profile } = useSnapshot(appState);
	const widgets = useWidgets();
	const style: ViewStyle = {
		width: isMobileResponsive ? 64 : 54,
	};

	const getRouteActive = (item: WidgetDocument) => {
		return `/${item._id}` === pathname || extensionId === item._id;
	};

	const handleExtensionPress = async (item: WidgetDocument) => {
		await router.navigate(`/${item._id}`);
	};

	const removeLayout = async (layout: WidgetDocument) => {
		widgetActions.removeWidget(layout);
		await router.navigate('/', { replace: true });
	};

	return (
		<DashboardNavigator
			style={style}
			profile={profile}
			widgets={widgets}
			getIsExtensionActive={getRouteActive}
			onExtensionPress={handleExtensionPress}
			onRemoveLayout={removeLayout}
		/>
	);
};

export default Navigator;
