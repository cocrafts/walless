import type { FC, RefObject } from 'react';
import type { LayoutRectangle, View, ViewStyle } from 'react-native';
import type {
	GestureUpdateEvent,
	PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';

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
	component: FC<{ config: ModalConfigs }>;
	positionOffset?: PositionOffset;
	maskStyle?: ViewStyle;
	maskActiveOpacity?: number;
	withoutMask?: boolean;
	hide?: boolean;
	context?: unknown;
	onBeforeHide?: () => void;
	/**
	 * use to determine size of modal wrapper (default: true),
	 * auto center modal if false
	 */
	fullWidth?: boolean;
}

export type ShowModalConfigs = Omit<
	ModalConfigs,
	'bindingRectangle' | 'hide'
> & {
	bindingRef?: RefObject<View>;
};

export interface ModalState {
	count: number;
	map: Map<string, ModalConfigs>;
}

export type GestureUpdater = (
	event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
) => void;
