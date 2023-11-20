import type { FC } from 'react';
import { useEffect } from 'react';
import type { ImageSourcePropType, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import type { WithTimingConfig } from 'react-native-reanimated';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Route } from '@react-navigation/native';
import { useSnapshot } from '@walless/app';
import { mockWidgets } from '@walless/engine';
import { AnimatedView } from '@walless/gui';
import { modules } from '@walless/ioc';
import { appState } from 'state/app';

import NavigationItem from './TabBarItem';

const getIconImage = (routeName: string): ImageSourcePropType => {
	switch (routeName) {
		case 'Profile':
			return { uri: appState.profile.profileImage };
		case 'Explore':
			return modules.asset.tabBar.explore;
		case 'Home':
			return modules.asset.tabBar.walless;
		default:
			return modules.asset.tabBar.walless;
	}
};

export const BottomNavigationTabBar: FC<BottomTabBarProps> = ({
	insets,
	state,
	navigation,
}) => {
	const { activeWidgetId, isDrawerOpen } = useSnapshot(appState);
	const offset = useSharedValue(0);
	const animatedStyles = useAnimatedStyle(() => ({
		transform: [{ translateY: withTiming(offset.value) }],
	}));

	const timingConfig: WithTimingConfig = {
		duration: 50,
	};

	useEffect(() => {
		if (
			!isDrawerOpen &&
			mockWidgets.some((widget) => widget._id === activeWidgetId)
		) {
			offset.value = withTiming(tabBarHeight, timingConfig);
		} else {
			offset.value = withTiming(0, timingConfig);
		}
	}, [isDrawerOpen]);

	const containerStyle: ViewStyle = {
		paddingBottom: insets.bottom,
	};

	const handleNavigate = (route: Route<string, never>, focused: boolean) => {
		const event = navigation.emit({
			type: 'tabPress',
			target: route.key,
			canPreventDefault: true,
		});

		if (!focused && !event.defaultPrevented) {
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

export const tabBarHeight = 96;
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: 'row',
		height: tabBarHeight,
		backgroundColor: '#081016',
	},
});
