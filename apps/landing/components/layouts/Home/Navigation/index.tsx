import { FC } from 'react';
import { useMedia } from '@tamagui/core';
import { Button, Stack } from '@walless/gui';
import Anchor from 'components/Anchor';
import { ContainerStack } from 'components/styled';

import HomeButton from './HomeButton';
import NavItem from './NavItem';
import { navigationHeight, navigationItems } from './shared';

export const HomeNavigation: FC = () => {
	const media = useMedia();

	return (
		<Stack position="absolute" top={0} right={0} left={0}>
			<ContainerStack
				horizontal
				backgroundColor="$navigationBg"
				alignItems="center"
				height={navigationHeight}
			>
				<HomeButton />
				<Stack horizontal flex={1} paddingLeft={12}>
					{media.gtSm &&
						navigationItems.map((item, index) => {
							return <NavItem key={index} item={item} />;
						})}
				</Stack>
				<Button title="Launch" />
			</ContainerStack>
		</Stack>
	);
};

export default HomeNavigation;

export * from './shared';
