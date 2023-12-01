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
import { useSnapshot } from '@walless/app';
import { AnimatedView } from '@walless/gui';
import { Home, Walless } from '@walless/icons';
import { HapticFeedbackTypes, modules } from '@walless/ioc';
import type { DashboardParamList } from 'utils/navigation';
import { localState } from 'utils/state';

import { ProfileIcon } from './ProfileIcon';
import type { Props as ItemProps } from './TabBarItem';
import TabBarItem from './TabBarItem';

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

	const handleNavigate = (route: RouteProp<DashboardParamList>) => {
		const currentRoute = state.routes[state.index];
		const isFocusing = currentRoute.key === route.key;

		const event = navigation.emit({
			type: 'tabPress',
			target: route.key,
			canPreventDefault: true,
		});

		if (!isFocusing && !event.defaultPrevented) {
			modules.native.triggerHaptic(HapticFeedbackTypes.impactHeavy);
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

const iconPropsFromRouteMap: Record<string, Omit<ItemProps, 'route'>> = {
	Home: {
		icon: Home,
	},
	Explore: {
		icon: Walless,
	},
	Setting: {
		icon: ProfileIcon,
	},
};

export const tabBarHeight = 60;
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
		paddingVertical: 12,
		backgroundColor: '#081016',
	},
	itemContainer: {
		padding: 8,
	},
});
