import { FC } from 'react';

import ChooseLayout from './ChooseLayout';
import DashboardLayout from './Layout';

export const HomeScreen: FC = () => {
	return (
		<DashboardLayout contentContainerClass="bg-gradient-to-b from-color-5 to-color-6 flex-1">
			<ChooseLayout />
		</DashboardLayout>
	);
};

export default HomeScreen;
