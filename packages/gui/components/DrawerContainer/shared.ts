import type { LayoutRectangle, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

export type DrawerPosition = 'left' | 'right';
export type DrawerType = 'front' | 'back' | 'slide' | 'permanent';

export interface DrawerComponentProps {
	id?: string;
}

export interface AnimatorContext {
	drawerPosition: DrawerPosition;
	drawerLayout: SharedValue<LayoutRectangle>;
	contentLayout: SharedValue<LayoutRectangle>;
}

export interface DrawerAnimator {
	container: (context: AnimatorContext) => ViewStyle;
	drawer: (context: AnimatorContext) => ViewStyle;
	content: (context: AnimatorContext) => ViewStyle;
}

export const frontAnimator: DrawerAnimator = {
	container: () => {
		return {};
	},
	drawer: () => {
		return {
			zIndex: 1,
			position: 'absolute',
			top: 0,
			left: 0,
			bottom: 0,
		};
	},
	content: () => {
		return {
			zIndex: 0,
			marginLeft: 0,
			marginRight: 0,
		};
	},
};

export const backAnimator: DrawerAnimator = {
	container: () => {
		return {};
	},
	drawer: () => {
		return {
			zIndex: 2,
			position: 'absolute',
			top: 0,
			left: 0,
			bottom: 0,
		};
	},
	content: () => {
		return {
			zIndex: 1,
			marginLeft: 0,
			marginRight: 0,
		};
	},
};

export const permanentAnimator: DrawerAnimator = {
	container: () => {
		return {};
	},
	drawer: ({ drawerPosition }) => {
		return {
			zIndex: 1,
			position: 'absolute',
			top: 0,
			left: drawerPosition === 'left' ? 0 : undefined,
			right: drawerPosition === 'right' ? 0 : undefined,
			bottom: 0,
		};
	},
	content: ({ drawerPosition, drawerLayout }) => {
		return {
			zIndex: 0,
			marginRight: drawerPosition === 'right' ? drawerLayout.value.width : 0,
			marginLeft: drawerPosition === 'left' ? drawerLayout.value.width : 0,
		};
	},
};

export const drawerAnimators: Record<string, DrawerAnimator> = {
	front: frontAnimator,
	back: backAnimator,
	permanent: permanentAnimator,
};
