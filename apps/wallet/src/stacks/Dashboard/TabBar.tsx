import type { FC } from 'react';
import { useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import type { WithTimingConfig } from 'react-native-reanimated';
import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { RouteProp } from '@react-navigation/native';
import { AnimatedView } from '@walless/gui';
import type { IconProps } from '@walless/icons';
import { Globe, Home, Walless } from '@walless/icons';
import { appState } from 'state/app';
import { runtimeState } from 'state/runtime';
import { tabBarHeight } from 'utils/constants';
import { useSnapshot } from 'utils/hooks';
import { HapticFeedbackTypes, nativeModules } from 'utils/native';
import type { DashboardParamList } from 'utils/navigation';
import { colors } from 'utils/style';

import { ProfileIcon } from './ProfileIcon';
import TabBarItem from './TabBarItem';

const timingConfig: WithTimingConfig = {
	duration: 150,
	easing: Easing.linear,
};

interface Props {
	tabProps: BottomTabBarProps;
}

const mustHaveBottomTabBarRoutes = ['Home', 'Setting'];

export const BottomNavigationTabBar: FC<Props> = ({ tabProps }) => {
	const { insets, state, navigation } = tabProps;
	const { isDrawerOpen } = useSnapshot(runtimeState);
	const { navigationDisplay } = useSnapshot(appState);
	const offset = useSharedValue(0);
	const realBarHeight = tabBarHeight + insets.bottom;
	const animatedStyles = useAnimatedStyle(
		() => ({
			transform: [{ translateY: offset.value }],
		}),
		[offset],
	);

	const { routes, index } = state;
	const currentRoute = routes[index];

	useEffect(() => {
		const mustHaveBottomTabBar = mustHaveBottomTabBarRoutes.includes(
			currentRoute.name,
		);

		const isBottomTabActive =
			navigationDisplay.isBottomTabActive &&
			(isDrawerOpen || mustHaveBottomTabBar);

		const nextOffset = isBottomTabActive ? 0 : realBarHeight;

		offset.value = withTiming(nextOffset, timingConfig);
	}, [isDrawerOpen, currentRoute, navigationDisplay.isBottomTabActive]);

	const containerStyle: ViewStyle = {
		height: realBarHeight,
		paddingBottom: insets.bottom,
	};

	const handleNavigate = (route: RouteProp<DashboardParamList>) => {
		const currentRoute = state.routes[state.index];
		const isFocusing = currentRoute.key === route.key;

		const event = navigation.emit({
			type: 'tabPress',
			target: route.key,
			canPreventDefault: true,
		});

		if (!isFocusing && !event.defaultPrevented) {
			nativeModules.triggerHaptic(HapticFeedbackTypes.impactMedium);
			navigation.navigate({
				name: route.name,
				merge: true,
			} as never);
		}
	};

	return (
		<AnimatedView style={[styles.container, containerStyle, animatedStyles]}>
			{state.routes.map((route, index) => {
				const isActive = state.index === index;
				const itemProps = iconPropsFromRouteMap[route.name];

				return (
					<TabBarItem
						key={route.key}
						isActive={isActive}
						onPress={handleNavigate}
						route={route as never}
						{...itemProps}
					/>
				);
			})}
		</AnimatedView>
	);
};

export default BottomNavigationTabBar;

interface IconMapProps {
	icon: FC<IconProps>;
	size: number;
}

const iconPropsFromRouteMap: Record<string, IconMapProps> = {
	Explore: {
		icon: Walless,
		size: 20,
	},
	Home: {
		icon: Home,
		size: 20,
	},
	Browser: {
		icon: Globe,
		size: 20,
	},
	Setting: {
		icon: ProfileIcon,
		size: 20,
	},
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: tabBarHeight,
		paddingVertical: 4,
		backgroundColor: colors.tabNavigatorBg,
	},
	itemContainer: {
		padding: 8,
	},
});
