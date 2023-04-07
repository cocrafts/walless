import { RefObject } from 'react';
import { Dimensions, LayoutRectangle, View, ViewStyle } from 'react-native';
import { interpolate, SharedValue } from 'react-native-reanimated';

import { AnimateDirections, BindDirections, PositionOffset } from './type';

export const referenceMap: Record<string, RefObject<View>> = {};

export const measure = async (
	viewRef: RefObject<View>,
): Promise<LayoutRectangle> =>
	new Promise((resolve) => {
		/* for Android, measure method won't behave well without collapsable = false */
		viewRef.current?.setNativeProps({ collapsable: false });

		setTimeout(() => {
			/* <-- at this point in time, collapsable = false must be ready/configured correctly */
			viewRef.current?.measure((x, y, width, height, px, py) => {
				resolve({ x: px, y: py, width, height });
			});
		}, 0);
	});

export const measureRelative = async (
	targetRef?: RefObject<View>,
): Promise<LayoutRectangle | undefined> => {
	if (!targetRef?.current) {
		/* <-- if there is no target, assume relative measure to device screen */
		const { width, height } = Dimensions.get('window');
		return Promise.resolve({ x: 0, y: 0, width, height });
	}

	/* compute relative position with referenceMap.root */
	const rootLayout = await measure(referenceMap.root);
	const targetLayout = await measure(targetRef);

	return {
		x: targetLayout.x - rootLayout.x,
		y: targetLayout.y - rootLayout.y,
		width: targetLayout.width,
		height: targetLayout.height,
	};
};

export const guardRectangleInside = async (
	rectangle: LayoutRectangle,
	targetRef: RefObject<View>,
	padding = 5,
): Promise<LayoutRectangle> => {
	const guarded = { ...rectangle };
	const target = await measure(targetRef);

	if (guarded.x < padding) {
		guarded.x = padding;
	} else if (guarded.x + guarded.width > target.x + target.width - padding) {
		guarded.x = target.x + target.width - guarded.width - padding;
	}

	if (guarded.y < padding) {
		guarded.y = padding;
	} else if (guarded.y + guarded.height > target.y + target.height - padding) {
		guarded.y = target.y + target.height - guarded.height - padding;
	}

	return guarded;
};

export const rectangleBind = async (
	target: LayoutRectangle,
	current: LayoutRectangle,
	direction?: BindDirections,
	offset?: PositionOffset,
	padding = 8,
): Promise<LayoutRectangle> => {
	const result: LayoutRectangle = {
		x: target.x + (target.width / 2 - current.width / 2) /* <- middle */,
		y: target.y + (target.height / 2 - current.height / 2) /* <- center */,
		width: current.width,
		height: current.height,
	};

	if (direction === BindDirections.Top) {
		result.x = target.x + (target.width / 2 - current.width / 2);
		result.y = target.y - current.height - padding;
	} else if (direction === BindDirections.TopLeft) {
		result.x = target.x;
		result.y = target.y - current.height - padding;
	} else if (direction === BindDirections.TopRight) {
		result.x = target.x + target.width - current.width;
		result.y = target.y - current.height - padding;
	} else if (direction === BindDirections.Bottom) {
		result.x = target.x + (target.width / 2 - current.width / 2);
		result.y = target.y + target.height + padding;
	} else if (direction === BindDirections.BottomLeft) {
		result.x = target.x;
		result.y = target.y + target.height + padding;
	} else if (direction === BindDirections.BottomRight) {
		result.x = target.x + target.width - current.width;
		result.y = target.y + target.height + padding;
	} else if (direction === BindDirections.Left) {
		result.x = target.x - current.width - padding;
		result.y = target.y + (target.height / 2 - current.height / 2);
	} else if (direction === BindDirections.LeftTop) {
		result.x = target.x - current.width - padding;
		result.y = target.y;
	} else if (direction === BindDirections.LeftBottom) {
		result.x = target.x - current.width - padding;
		result.y = target.y + target.height - current.height;
	} else if (direction === BindDirections.Right) {
		result.x = target.x + target.width + padding;
		result.y = target.y + (target.height / 2 - current.height / 2);
	} else if (direction === BindDirections.RightTop) {
		result.x = target.x + target.width + padding;
		result.y = target.y;
	} else if (direction === BindDirections.RightBottom) {
		result.x = target.x + target.width + padding;
		result.y = target.y + target.height - current.height;
	} else if (direction === BindDirections.InnerTop) {
		result.y = target.y + padding;
	} else if (direction === BindDirections.InnerTopLeft) {
		result.x = target.x + padding;
		result.y = target.y + padding;
	} else if (direction === BindDirections.InnerTopRight) {
		result.x = target.x + target.width - current.width - padding;
		result.y = target.y + padding;
	} else if (direction === BindDirections.InnerBottom) {
		result.y = target.y + target.height - current.height - padding;
	} else if (direction === BindDirections.InnerBottomLeft) {
		result.x = target.x + padding;
		result.y = target.y + target.height - current.height - padding;
	} else if (direction === BindDirections.InnerBottomRight) {
		result.x = target.x + target.width - current.width - padding;
		result.y = target.y + target.height - current.height - padding;
	} else if (direction === BindDirections.InnerLeft) {
		result.x = target.x + padding;
		result.y = target.y + (target.height / 2 - current.height / 2);
	} else if (direction === BindDirections.InnerRight) {
		result.x = target.x + target.width - current.width - padding;
		result.y = target.y + (target.height / 2 - current.height / 2);
	}

	if (offset) {
		result.x += offset.x || 0;
		result.y += offset.y || 0;
	}

	return guardRectangleInside(result, referenceMap.root);
};

export const rectangleAnimatedStyle = (
	shared: SharedValue<number>,
	direction: AnimateDirections | undefined,
	baseStyle: ViewStyle,
): ViewStyle => {
	'worklet';

	const animatedStyle: ViewStyle = {
		transform: [],
		...baseStyle,
	};

	if (direction === AnimateDirections.Top) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [20, 0]),
		});
	} else if (direction === AnimateDirections.TopLeft) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [20, 0]),
		});

		animatedStyle.borderTopLeftRadius = interpolate(
			shared.value,
			[0, 1],
			[100, 0],
		);
	} else if (direction === AnimateDirections.TopRight) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [20, 0]),
		});

		animatedStyle.borderTopRightRadius = interpolate(
			shared.value,
			[0, 1],
			[100, 0],
		);
	} else if (direction === AnimateDirections.Bottom) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [-20, 0]),
		});
	} else if (direction === AnimateDirections.BottomLeft) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [-20, 0]),
		});

		animatedStyle.borderBottomLeftRadius = interpolate(
			shared.value,
			[0, 1],
			[100, 0],
		);
	} else if (direction === AnimateDirections.BottomRight) {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [-20, 0]),
		});

		animatedStyle.borderBottomRightRadius = interpolate(
			shared.value,
			[0, 1],
			[100, 0],
		);
	} else if (direction === AnimateDirections.Left) {
		animatedStyle.transform?.push({
			translateX: interpolate(shared.value, [0, 1], [20, 0]),
		});
	} else if (direction === AnimateDirections.Right) {
		animatedStyle.transform?.push({
			translateX: interpolate(shared.value, [0, 1], [-20, 0]),
		});
	} else if (direction === AnimateDirections.Inner) {
		animatedStyle.transform?.push({
			scale: interpolate(shared.value, [0, 1], [0.95, 1]),
		});
	} else {
		animatedStyle.transform?.push({
			translateY: interpolate(shared.value, [0, 1], [-20, 0]),
		});
	}

	return animatedStyle;
};
