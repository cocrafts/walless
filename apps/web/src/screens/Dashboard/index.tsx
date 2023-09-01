import type { FC } from 'react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@walless/app';
import { modules } from '@walless/ioc';
import type { WidgetDocument } from '@walless/store';
import { appState } from 'state/app';
import {
	useLocation,
	useParams,
	useSettings,
	useSnapshot,
	useWidgets,
} from 'utils/hooks';
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
		await modules.storage.put(layout);
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
