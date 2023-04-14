import { FC } from 'react';
import { ScrollView, Stack } from '@walless/gui';

import { LayoutProps } from '../shared';

import Footer from './Footer';
import HeadingSection, { headingHeight } from './Heading';

export const HomeLayout: FC<LayoutProps> = ({ children }) => {
	return (
		<Stack flex={1}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				marginTop={headingHeight}
			>
				{children}
				<Footer />
			</ScrollView>
			<HeadingSection />
		</Stack>
	);
};

export default HomeLayout;
