import type { FC } from 'react';
import { useEffect } from 'react';
import type { ImageSourcePropType, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import type { WithTimingConfig } from 'react-native-reanimated';
import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Route } from '@react-navigation/native';
import { useSnapshot } from '@walless/app';
import { appState } from '@walless/engine';
import { AnimatedView } from '@walless/gui';
import { modules } from '@walless/ioc';
import { localState } from 'utils/state';

import NavigationItem from './TabBarItem';

const getIconImage = (routeName: string): ImageSourcePropType => {
	const backupUri: ImageSourcePropType = {
		uri: '/assets/img/icon.png',
	};

	switch (routeName) {
		case 'Profile':
			return { uri: appState.profile.profileImage };
		case 'Explore':
			return modules.asset.tabBar?.explore || backupUri;
		case 'Home':
			return modules.asset.tabBar?.walless || backupUri;
		default:
			return modules.asset.tabBar?.walless || backupUri;
	}
};

const timingConfig: WithTimingConfig = {
	duration: 150,
	easing: Easing.linear,
};

interface Props {
	tabProps: BottomTabBarProps;
}

export const BottomNavigationTabBar: FC<Props> = ({ tabProps }) => {
	const { insets, state, navigation } = tabProps;
	const { isDrawerOpen } = useSnapshot(localState);
	const offset = useSharedValue(0);
	const realBarHeight = tabBarHeight + insets.bottom;
	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ translateY: offset.value }],
	}));

	useEffect(() => {
		const nextOffset = isDrawerOpen ? 0 : realBarHeight;
		offset.value = withTiming(nextOffset, timingConfig);
	}, [isDrawerOpen]);

	const containerStyle: ViewStyle = {
		height: realBarHeight,
		paddingBottom: insets.bottom,
	};

	const handleNavigate = (route: Route<string, never>, focused: boolean) => {
		const event = navigation.emit({
			type: 'tabPress',
			target: route.key,
			canPreventDefault: true,
		});

		if (!focused && !event.defaultPrevented) {
			HapticFeedback.trigger('impactHeavy', {
				enableVibrateFallback: true,
				ignoreAndroidSystemSettings: false,
			});

			navigation.navigate({ name: route.name, merge: true } as never);
		}
	};

	return (
		<AnimatedView style={[styles.container, containerStyle, animatedStyles]}>
			{state.routes.map((route, index) => {
				const isFocused = state.index === index;

				return (
					<NavigationItem
						key={index}
						route={route as never}
						focused={isFocused}
						onNavigate={handleNavigate}
						tabIcon={getIconImage(route.name)}
					/>
				);
			})}
		</AnimatedView>
	);
};

export default BottomNavigationTabBar;

export const tabBarHeight = 48;
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		flexDirection: 'row',
		height: tabBarHeight,
		backgroundColor: '#081016',
	},
});
