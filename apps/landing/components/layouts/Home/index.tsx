import { FC } from 'react';
import { ScrollView, Stack } from '@walless/gui';

import { LayoutProps } from '../shared';

import Navigation, { navigationHeight } from './Navigation';

export const HomeLayout: FC<LayoutProps> = ({ children, ...stackProps }) => {
	return (
		<Stack flex={1} {...stackProps}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				marginTop={navigationHeight}
			>
				{children}
			</ScrollView>
			<Navigation />
		</Stack>
	);
};

export default HomeLayout;
