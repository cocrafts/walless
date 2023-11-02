import type { FC } from 'react';
import type { ImageSourcePropType, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useDrawerStatus } from '@react-navigation/drawer';
import type { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import type { Route } from '@react-navigation/native';
import { appState } from '@walless/engine';

import NavigationItem from './Item';

const getIconImage = (routeName: string): ImageSourcePropType | undefined => {
	switch (routeName) {
		case 'Profile':
			return { uri: appState.profile.profileImage };
		case 'Explore':
			return require('assets/img/explore.png');
		case 'OurProject':
			return require('assets/img/icon-white.png');
		default:
			break;
	}
};

type TabBarProps = BottomTabBarProps & {
	drawerNavigation: DrawerNavigationHelpers;
};

export const BottomNavigationTabBar: FC<TabBarProps> = ({
	insets,
	state,
	navigation,
	drawerNavigation,
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

	const drawerStatus = useDrawerStatus();

	return (
		<View style={[styles.container, containerStyle]}>
			<NavigationItem
				route={{
					key: 'OurProject',
					name: 'OurProject',
					params: {} as never,
				}}
				focused={drawerStatus === 'open'}
				tabIcon={getIconImage('OurProject')}
				onNavigate={drawerNavigation.toggleDrawer}
			/>

			{state.routes.map((route, index) => {
				const isFocused = drawerStatus === 'closed' && state.index === index;

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
