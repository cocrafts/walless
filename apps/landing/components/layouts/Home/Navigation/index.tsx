import type { FC } from 'react';
import { useMedia } from '@tamagui/core';
import { Button, Stack } from '@walless/ui';
import { ContainerStack } from 'components/styled';
import { handleShowSignUpModal } from 'features/home/HeadingSection/SignUpModal';

import HomeButton from './HomeButton';
import NavItem from './NavItem';
import { navigationHeight, navigationItems } from './shared';

export const HomeNavigation: FC = () => {
	const media = useMedia();

	const temporarilyDisabled = true;

	return (
		<Stack
			backgroundColor="$navigationBg"
			position="absolute"
			top={0}
			right={0}
			left={0}
		>
			<ContainerStack horizontal alignItems="center" height={navigationHeight}>
				<HomeButton />
				<Stack horizontal flex={1} paddingLeft={12}>
					{!temporarilyDisabled &&
						media.gtSm &&
						navigationItems.map((item, index) => {
							return <NavItem key={index} item={item} />;
						})}
				</Stack>

				<Button title="Get early access" onPress={handleShowSignUpModal} />
			</ContainerStack>
		</Stack>
	);
};

export default HomeNavigation;

export * from './shared';
