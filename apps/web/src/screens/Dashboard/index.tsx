import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Outlet } from 'react-router-dom';
import { DashboardNavigator, useSettings } from '@walless/app';
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
		<View style={styles.container}>
			<DashboardNavigator
				style={styles.navigatorContainer}
				profile={profile}
				widgets={widgets}
				getIsExtensionActive={getRouteActive}
				onExtensionPress={handleExtensionPress}
				onRemoveLayout={removeLayout}
			/>
			<View style={styles.contentContainer}>
				<Outlet />
			</View>
		</View>
	);
};

export default DashboardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	navigatorContainer: {
		width: 54,
	},
	contentContainer: {
		flex: 1,
	},
});
