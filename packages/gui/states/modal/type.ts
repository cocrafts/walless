import type { FC, RefObject } from 'react';
import type { LayoutRectangle, View, ViewStyle } from 'react-native';

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
	bindingRef?: RefObject<View>;
	bindingRectangle?: LayoutRectangle;
	bindingDirection?: BindDirections;
	animateDirection?: AnimateDirections;
	component: FC<{ config: ModalConfigs }>;
	positionOffset?: PositionOffset;
	maskStyle?: ViewStyle;
	maskActiveOpacity?: number;
	withoutMask?: boolean;
	hide?: boolean;
	context?: unknown;
	/**
	 * use to determine size of modal wrapper (default: true),
	 * auto center modal if false
	 */
	fullWidth?: boolean;
}

export type ShowModalConfigs = Omit<ModalConfigs, 'bindingRectangle' | 'hide'>;

export interface ModalState {
	count: number;
	map: Map<string, ModalConfigs>;
}
