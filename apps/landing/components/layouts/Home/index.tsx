import { FC } from 'react';
import { Theme } from '@tamagui/core';
import { Button, ScrollView, Stack } from '@walless/gui';
import Anchor from 'components/Anchor';
import { ContainerStack } from 'components/styled';

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

				<ContainerStack
					pointerEvents="box-none"
					alignItems="flex-end"
					justifyContent="flex-end"
					position="absolute"
					right={0}
					bottom={0}
					left={0}
					paddingBottom={32}
				>
					<Anchor href="https://discord.gg/3v7jwG45pe" target="_blank">
						<Button
							title="Visit Us"
							paddingHorizontal={28}
							backgroundColor="white"
							color="#222222"
						/>
					</Anchor>
				</ContainerStack>
			</Stack>
		</Theme>
	);
};

export default HomeLayout;
