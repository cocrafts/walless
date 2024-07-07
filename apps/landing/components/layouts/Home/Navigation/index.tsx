import type { FC } from 'react';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useMedia } from '@tamagui/core';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	View,
} from '@walless/gui';
import { View } from '@walless/gui';
import { Button } from '@walless/ui';
import { ContainerStack } from 'components/styled';
import { useRouter } from 'next/router';

import HomeButton from './HomeButton';
import LaunchingModal from './LaunchingModal';
import { NavigationItem } from './NavigationItem';
import { navigationHeight, navigationItems } from './shared';

export const HomeNavigation: FC = () => {
	const router = useRouter();
	const media = useMedia();
	const modalRef = useRef(null);

	const temporarilyDisabled = false;
	const handleShowLaunchingModal = () => {
		modalActions.show({
			id: 'launching',
			fullWidth: false,
			bindingRef: modalRef,
			bindingDirection: BindDirections.InnerTopLeft,
			animateDirection: AnimateDirections.Inner,
			component: LaunchingModal,
		});
	};

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

				<View ref={modalRef}>
					<Button
						title="Access Walless"
						marginHorizontal={8}
						onPress={handleShowLaunchingModal}
					/>
				</View>
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
		userSelect: 'none',
	},
	navigationBar: {
		flex: 1,
		flexDirection: 'row',
		height: navigationHeight,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
