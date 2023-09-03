import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useMedia } from '@tamagui/core';
import { NavigationItem } from '@walless/app';
import { View } from '@walless/gui';
import { Button } from '@walless/ui';
import { ContainerStack } from 'components/styled';
import { handleShowSignUpModal } from 'features/home/HeadingSection/SignUpModal';
import { useRouter } from 'next/router';

import HomeButton from './HomeButton';
import { navigationHeight, navigationItems } from './shared';

export const HomeNavigation: FC = () => {
	const router = useRouter();
	const media = useMedia();

	const temporarilyDisabled = false;

	return (
		<View style={styles.container}>
			<ContainerStack horizontal alignItems="center" height={navigationHeight}>
				<HomeButton />
				<View style={styles.navigationBar}>
					{!temporarilyDisabled &&
						media.gtSm &&
						navigationItems.map((item) => {
							return (
								<NavigationItem
									key={item.href}
									item={item}
									isActive={router.pathname === item.href}
								/>
							);
						})}
				</View>

				<Button title="Join Waitlist" onPress={handleShowSignUpModal} />
			</ContainerStack>
		</View>
	);
};

export default HomeNavigation;

export * from './shared';

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		backgroundColor: '$navigationBg',
	},
	navigationBar: {
		flex: 1,
		flexDirection: 'row',
		height: navigationHeight,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
