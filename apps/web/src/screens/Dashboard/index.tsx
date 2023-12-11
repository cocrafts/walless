import type { FC } from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Outlet } from 'react-router-dom';
import {
	universalActions,
	universalSate,
	useResponsive,
	useSettings,
	useSnapshot,
} from '@walless/app';
import type { DrawerType } from '@walless/gui';
import { DrawerContainer } from '@walless/gui';
import { useLocation } from 'utils/hooks';

import Sidebar from './components/Sidebar';

export const DashboardScreen: FC = () => {
	const { isDrawerOpen } = useSnapshot(universalSate);
	const { isMobileResponsive } = useResponsive();
	const drawerType: DrawerType = isMobileResponsive ? 'back' : 'permanent';
	const { pathname } = useLocation();
	const { setting, setPathname } = useSettings();

	useEffect(() => {
		if (pathname !== setting?.latestLocation) {
			setPathname(pathname);
		}
	}, [pathname]);

	const handleToggleRequest = (flag: boolean) => {
		universalActions.toggleDrawer(flag);
	};

	return (
		<DrawerContainer
			style={styles.container}
			DrawerComponent={Sidebar}
			drawerType={drawerType}
			isOpen={isDrawerOpen}
			onRequestToggle={handleToggleRequest}
			contentContainerStyle={styles.contentContainer}
		>
			<Outlet />
		</DrawerContainer>
	);
};

export default DashboardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	contentContainer: {
		flex: 1,
		backgroundColor: '#19232c',
	},
});
