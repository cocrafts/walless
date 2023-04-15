import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ScrollView, Stack } from '@walless/gui';

import Navigator from './Navigator';

const Layout: FC = () => {
	return (
		<Stack backgroundColor="$primary3" flex={1} flexDirection="row">
			<Navigator />
			<Stack flex={1}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Outlet />
				</ScrollView>
			</Stack>
		</Stack>
	);
};

export default Layout;
