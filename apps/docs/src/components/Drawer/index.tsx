/* eslint-disable react/display-name */
import { type ReactNode, forwardRef, useImperativeHandle } from 'react';
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
	Component: ReactNode;
} & ViewProps;

export const Drawer = forwardRef<DrawerType, DrawerProps>(
	({ children, Component }, ref) => {
		const x = useSharedValue(-300);

		const menuStyle = useAnimatedStyle(() => {
			console.log(x.value);
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
						else x.value = withTiming(-300, { duration: 200 });
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

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
	},
	menuContainer: {
		position: 'absolute',
		left: 0,
		top: 0,
		bottom: 0,
		width: 300,
		backgroundColor: '#161b22',
		opacity: 0.96,
	},
});
