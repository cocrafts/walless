import { FC } from 'react';
import { Theme } from '@tamagui/core';
import { ScrollView, Stack } from '@walless/gui';

import { LayoutProps } from '../shared';

import Navigation, { navigationHeight } from './Navigation';

export const HomeLayout: FC<LayoutProps> = ({
	theme = 'dark',
	children,
	...stackProps
}) => {
	return (
		<Theme name={theme}>
			<Stack flex={1} backgroundColor="$background" {...stackProps}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					marginTop={navigationHeight}
				>
					{children}
				</ScrollView>
				<Navigation />
			</Stack>
		</Theme>
	);
};

export default HomeLayout;
