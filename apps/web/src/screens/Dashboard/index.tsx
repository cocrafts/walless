import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardLayout from './DashboardLayout';

export const DashboardScreen: FC = () => {
	return (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	);
};

export default DashboardScreen;
