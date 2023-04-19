import { type LayoutRectangle, StyleSheet } from 'react-native';

export const idleLayout: LayoutRectangle = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
};

export const iStyles = StyleSheet.create({
	horizontal: {
		flexDirection: 'row',
	},
	fullScreen: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
});

export interface DynamicFlags {
	horizontal?: boolean;
	fullScreen?: boolean;
}
