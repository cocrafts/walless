import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from '@tamagui/core';
import { Button, ScrollView, Stack } from '@walless/gui';
import Anchor from 'components/Anchor';
import { ContainerStack } from 'components/styled';

import { LayoutProps } from '../shared';

import Footer from './Footer';
import Navigation, { navigationHeight } from './Navigation';

export const HomeLayout: FC<LayoutProps> = ({
	theme = 'dark',
	children,
	...stackProps
}) => {
	const floatingElement = (
		<ContainerStack
			pointerEvents="box-none"
			alignItems="flex-end"
			justifyContent="flex-end"
			position="absolute"
			right={0}
			bottom={0}
			left={0}
		>
			<Anchor href="https://discord.gg/3v7jwG45pe" target="_blank">
				<Button
					title="Contact Us"
					paddingHorizontal={28}
					backgroundColor="white"
					color="#222222"
				/>
			</Anchor>
		</ContainerStack>
	);

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
				{floatingElement}
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
