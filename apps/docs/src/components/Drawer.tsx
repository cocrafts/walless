import { type ReactElement, forwardRef, useImperativeHandle } from 'react';
import { type ViewProps, StyleSheet, View } from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedView } from '@walless/gui';

export type DrawerType = {
	toggleMenu: () => void;
};

export type DrawerProps = {
	Component: ReactElement;
} & ViewProps;

export const Drawer = forwardRef<DrawerType, DrawerProps>(
	({ children, Component }, ref) => {
		const x = useSharedValue(-menuWidth);

		const menuStyle = useAnimatedStyle(() => {
			return {
				transform: [{ translateX: x.value }],
			};
		}, [x]);

		useImperativeHandle(
			ref,
			() => {
				return {
					toggleMenu() {
						if (x.value < 0) x.value = withTiming(0, { duration: 200 });
						else x.value = withTiming(-menuWidth, { duration: 200 });
					},
				};
			},
			[],
		);

		return (
			<View style={styles.container}>
				{children}
				<AnimatedView style={[styles.menuContainer, menuStyle]}>
					{Component}
				</AnimatedView>
			</View>
		);
	},
);

Drawer.displayName = 'Drawer';

const menuWidth = 300;

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
	},
	menuContainer: {
		position: 'absolute',
		left: 0,
		top: 0,
		bottom: 0,
		width: menuWidth,
		backgroundColor: '#161b22',
		opacity: 0.98,
	},
});
