import { FC } from 'react';
import { ScrollView, Stack } from '@walless/gui';

import { LayoutProps } from '../shared';

import HeadingSection, { headingHeight } from './Heading';

export const HomeLayout: FC<LayoutProps> = ({ children }) => {
	return (
		<Stack flex={1}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				marginTop={headingHeight}
			>
				{children}
			</ScrollView>
			<HeadingSection />
		</Stack>
	);
};

export default HomeLayout;
