import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Route } from '@react-navigation/native';

import NavigationItem from './Item';
export const BottomNavigationTabBar: FC<BottomTabBarProps> = ({
	insets,
	state,
	navigation,
}) => {
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
		<View style={[styles.container, containerStyle]}>
			{state.routes.map((route, index) => {
				const isFocused = state.index === index;

				return (
					<NavigationItem
						key={index}
						route={route as never}
						focused={isFocused}
						onNavigate={handleNavigate}
					/>
				);
			})}
		</View>
	);
};

export default BottomNavigationTabBar;

export const tabBarHeight = 80;
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
