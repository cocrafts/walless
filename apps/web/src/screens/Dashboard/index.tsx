import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Stack } from '@walless/gui';

import DashboardLayout from './DashboardLayout';

export const DashboardScreen: FC = () => {
	return (
		<Stack>
			<DashboardLayout>
				<Outlet />
			</DashboardLayout>
		</Stack>
	);
};

export default DashboardScreen;
