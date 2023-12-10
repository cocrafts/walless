import type { ViewStyle } from 'react-native';
export type DrawerType = 'front' | 'back' | 'slide' | 'permanent';

export interface DrawerComponentProps {
	id?: string;
}

export interface DrawerAnimator {
	drawer: () => ViewStyle;
	content: () => ViewStyle;
}

export const frontAnimator: DrawerAnimator = {
	drawer: () => {
		return {};
	},
	content: () => {
		return {};
	},
};

export const drawerAnimators: Record<string, DrawerAnimator> = {
	front: frontAnimator,
};
