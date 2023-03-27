import { FunctionComponent, RefObject } from 'react';
import { LayoutRectangle, View, ViewStyle } from 'react-native';

export enum BindDirections {
	Top,
	TopLeft,
	TopRight,
	Bottom,
	BottomLeft,
	BottomRight,
	Left,
	LeftTop,
	LeftBottom,
	Right,
	RightTop,
	RightBottom,
	Inner,
	InnerTop,
	InnerTopLeft,
	InnerTopRight,
	InnerBottom,
	InnerBottomLeft,
	InnerBottomRight,
	InnerLeft,
	InnerRight,
}

export enum AnimateDirections {
	Top,
	TopLeft,
	TopRight,
	Bottom,
	BottomLeft,
	BottomRight,
	Left,
	Right,
	Inner,
}

export interface PositionOffset {
	x?: number;
	y?: number;
}

export interface ModalConfigs {
	id?: string;
	bindingRectangle?: LayoutRectangle;
	bindingDirection?: BindDirections;
	animateDirection?: AnimateDirections;
	component: FunctionComponent<{ config: ModalConfigs }>;
	positionOffset?: PositionOffset;
	maskStyle?: ViewStyle;
	maskActiveOpacity?: number;
	withoutMask?: boolean;
	hide?: boolean;
	context?: unknown;
}

export type ShowModalConfigs = Omit<
	ModalConfigs,
	'bindingRectangle' | 'hide'
> & {
	bindingRef?: RefObject<View>;
};

export interface ModalState {
	count: number;
	hashmap: Record<string, ModalConfigs>;
}
