import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from '@tamagui/core';
import { ScrollView, Stack } from '@walless/ui';

import type { LayoutProps } from '../shared';

import Footer from './Footer';
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
					contentContainerStyle={styles.contentContainer}
					showsVerticalScrollIndicator={false}
					marginTop={navigationHeight}
				>
					{children}
					<Footer />
				</ScrollView>
				<Navigation />
			</Stack>
		</Theme>
	);
};

export default HomeLayout;

const styles = StyleSheet.create({
	contentContainer: {
		justifyContent: 'space-between',
		minHeight: '100vh',
	},
});
