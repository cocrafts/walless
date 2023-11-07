import { type FC, useEffect, useState } from 'react';
import type { ImageSourcePropType, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { Route } from '@react-navigation/native';
import { useSnapshot } from '@walless/app';
import { mockWidgets } from '@walless/engine';
import { modules } from '@walless/ioc';
import { appActions, appState } from 'state/app';

import NavigationItem from './Item';

const getIconImage = (routeName: string): ImageSourcePropType | undefined => {
	switch (routeName) {
		case 'Profile':
			return { uri: appState.profile.profileImage };
		case 'Explore':
			return modules.asset.tabBar.explore;
		case 'OurProject':
			return modules.asset.tabBar.walless;
		default:
			break;
	}
};

export const BottomNavigationTabBar: FC<BottomTabBarProps> = ({
	insets,
	state,
	navigation,
}) => {
	const { activeWidgetId } = useSnapshot(appState);
	const [showBottomTab, setShowBottomTab] = useState(true);
	useEffect(() => {
		if (mockWidgets.some((widget) => widget._id === activeWidgetId)) {
			setShowBottomTab(false);
		} else {
			setShowBottomTab(true);
		}
	}, [activeWidgetId]);

	const containerStyle: ViewStyle = {
		paddingBottom: insets.bottom,
		display: showBottomTab ? 'flex' : 'none',
	};

	const handleNavigate = (route: Route<string, never>, focused: boolean) => {
		const event = navigation.emit({
			type: 'tabPress',
			target: route.key,
			canPreventDefault: true,
		});

		if (!focused && !event.defaultPrevented) {
			appActions.setActiveWidget(route.name);
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
						tabIcon={getIconImage(route.name)}
					/>
				);
			})}
		</View>
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
