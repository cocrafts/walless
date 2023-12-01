import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { WithTimingConfig } from 'react-native-reanimated';
import {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSnapshot } from '@walless/app';
import { appState } from '@walless/engine';
import { AnimatedView } from '@walless/gui';
import { Home, Setting, Walless } from '@walless/icons';
import { localState } from 'utils/state';

const timingConfig: WithTimingConfig = {
	duration: 150,
	easing: Easing.linear,
};

interface Props {
	tabProps: BottomTabBarProps;
}

const iconSize = 32;

const ChildrenList: ReactNode[] = [
	<Walless key="Explore" size={iconSize} />,
	<Home key="Home" size={iconSize} />,
	<Setting key="Setting" size={iconSize} />,
];

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

	useEffect(() => {
		if (appState.profile.profileImage) {
			ChildrenList[2] = (
				<Image
					key="Setting"
					style={{
						width: iconSize,
						height: iconSize,
						borderRadius: iconSize / 2,
					}}
					source={{ uri: appState.profile.profileImage }}
				/>
			);
		}
	}, []);

	const containerStyle: ViewStyle = {
		height: realBarHeight,
		paddingBottom: insets.bottom,
	};

	const handleNavigate = (index: number) => {
		const focused = state.index === index;

		const event = navigation.emit({
			type: 'tabPress',
			target: state.routes[index].key,
			canPreventDefault: true,
		});

		if (!focused && !event.defaultPrevented) {
			navigation.navigate({
				name: state.routes[index].name,
				merge: true,
			} as never);
		}
	};

	return (
		<AnimatedView style={[styles.container, containerStyle, animatedStyles]}>
			{state.routes.map((route, index) => {
				const focused = state.index === index;
				const icon = ChildrenList[index];
				const itemContainerStyle: ViewStyle = {
					opacity: focused ? 1 : 0.5,
				};
				return (
					<TouchableOpacity
						key={route.key}
						style={[styles.itemContainer, itemContainerStyle]}
						onPress={() => handleNavigate(index)}
					>
						{icon}
					</TouchableOpacity>
				);
			})}
		</AnimatedView>
	);
};

export default BottomNavigationTabBar;

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
