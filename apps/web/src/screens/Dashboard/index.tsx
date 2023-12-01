import type { FC } from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout, useSettings } from '@walless/app';
import { appState, widgetActions } from '@walless/engine';
import type { WidgetDocument } from '@walless/store';
import { useLocation, useParams, useSnapshot, useWidgets } from 'utils/hooks';
import { router } from 'utils/routing';

export const DashboardScreen: FC = () => {
	const { id: extensionId } = useParams<'id'>();
	const { pathname } = useLocation();
	const { profile } = useSnapshot(appState);
	const widgets = useWidgets();
	const { setting, setPathname } = useSettings();

	const getRouteActive = (item: WidgetDocument) => {
		return `/${item._id}` === pathname || extensionId === item._id;
	};

	const handleExtensionPress = async (item: WidgetDocument) => {
		await router.navigate(`/${item._id}`);
	};

	const removeLayout = async (layout: WidgetDocument) => {
		widgetActions.removeWidget(layout);
		await router.navigate('/');
	};

	useEffect(() => {
		if (pathname !== setting?.latestLocation) {
			setPathname(pathname);
		}
	}, [pathname]);

	return (
		<DashboardLayout
			profile={profile}
			widgets={widgets}
			getIsExtensionActive={getRouteActive}
			onExtensionPress={handleExtensionPress}
			onRemoveLayout={removeLayout}
		>
			<Outlet />
		</DashboardLayout>
	);
};

export default DashboardScreen;
