import type { LayoutRectangle } from 'react-native';
import { Platform, StyleSheet } from 'react-native';

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
	cursorPointer: Platform.select({
		default: {},
		web: { cursor: 'pointer' },
	}) as never,
	noSelect: Platform.select({
		default: {},
		web: { userSelect: 'none' },
	}) as never,
	link: {
		color: '#19A3E1',
	},
});

export interface DynamicFlags {
	horizontal?: boolean;
	fullscreen?: boolean;
	cursorPointer?: boolean;
	noSelect?: boolean;
}
