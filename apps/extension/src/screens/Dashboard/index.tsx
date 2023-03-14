import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import ModalManager from 'components/modals/ModalManager';

import DashboardLayout from './Layout';

export const HomeScreen: FC = () => {
	return (
		<React.Fragment>
			<DashboardLayout contentContainerClass="bg-gradient-to-b from-color-5 to-color-6 flex-1 overflow-y-scroll">
				<Outlet />
			</DashboardLayout>
			<ModalManager />
		</React.Fragment>
	);
};

export default HomeScreen;
