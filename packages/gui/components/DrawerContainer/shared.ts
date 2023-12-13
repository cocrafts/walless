import { Easing, type LayoutRectangle, type ViewStyle } from 'react-native';
import { type SharedValue, withTiming } from 'react-native-reanimated';

export type DrawerPosition = 'left' | 'right';
export type DrawerType = 'front' | 'back' | 'slide' | 'permanent';

export interface DrawerComponentProps {
	id?: string;
}

export interface AnimatorContext {
	drawerPosition: DrawerPosition;
	drawerLayout: SharedValue<LayoutRectangle>;
	contentLayout: SharedValue<LayoutRectangle>;
	isOpen?: boolean;
}

export interface DrawerAnimator {
	container: (context: AnimatorContext) => ViewStyle;
	drawer: (context: AnimatorContext) => ViewStyle;
	content: (context: AnimatorContext) => ViewStyle;
	mask: (context: AnimatorContext) => ViewStyle;
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
	mask: () => {
		return {};
	},
};

export const backAnimator: DrawerAnimator = {
	container: () => {
		return {};
	},
	drawer: () => {
		return {
			zIndex: 0,
			position: 'absolute',
			top: 0,
			left: 0,
			bottom: 0,
		};
	},
	content: ({ isOpen, drawerLayout }) => {
		return {
			zIndex: 1,
			marginLeft: 0,
			marginRight: 0,
			transform: [
				{
					translateX: withTiming(isOpen ? drawerLayout.value.width : 0, {
						duration: 100,
						easing: Easing.cubic,
					}),
				},
			],
		};
	},
	mask: () => {
		return {};
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
			transform: [{ translateX: 0 }],
		};
	},
	mask: () => {
		return { opacity: 0 };
	},
};

export const drawerAnimators: Record<string, DrawerAnimator> = {
	front: frontAnimator,
	back: backAnimator,
	permanent: permanentAnimator,
};
