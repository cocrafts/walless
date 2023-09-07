import type { FC, ReactNode } from 'react';
import { View } from '@walless/gui';

import { Header } from '.';

interface Props {
	children: ReactNode;
}

export const DashboardLayout: FC<Props> = ({ children }) => {
	return (
		<View>
			<Header />
			{children}
		</View>
	);
};

export default DashboardLayout;
