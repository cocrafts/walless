import { forwardRef, useMemo, useRef } from 'react';
import type {
	GestureResponderEvent,
	MouseEvent,
	PressableProps,
	StyleProp,
	View,
	ViewStyle,
} from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import { injectedFontStyle } from '../utils/font';
import type { DynamicFlags } from '../utils/style';
import { iStyles } from '../utils/style';

import { AnimatedPressable } from './aliased';

interface MouseContext {
	mouseIn?: boolean;
}

export type Props = Omit<DynamicFlags, 'cursorPointer'> &
	PressableProps & {
		style?: StyleProp<ViewStyle>;
		hoverOpacity?: number;
		animationDuration?: number;
	};

export const Hoverable = forwardRef<View, Props>(
	(
		{
			style,
			children,
			hoverOpacity = 0.8,
			onHoverIn,
			onHoverOut,
			animationDuration = 50,
			onPress,
			onLongPress,
			onLayout,
			fullscreen,
			horizontal,
			noSelect = true,
			disabled,
			hitSlop = 12,
		},
		ref,
	) => {
		const dynamicStyle = injectedFontStyle(style);
		const mouseContextRef = useRef<MouseContext>({});
		const opacity = useSharedValue(1);
		const animatedStyle = useAnimatedStyle(
			() => ({
				opacity: opacity.value,
			}),
			[opacity],
		);
		const containerStyle = useMemo(() => {
			return [
				animatedStyle,
				horizontal && iStyles.horizontal,
				fullscreen && iStyles.fullScreen,
				noSelect && iStyles.noSelect,
				style,
			];
		}, [style, horizontal, fullscreen, noSelect]);

		const handleHoverIn = (event: MouseEvent) => {
			opacity.value = withTiming(hoverOpacity, { duration: animationDuration });
			mouseContextRef.current.mouseIn = true;
			onHoverIn?.(event);
		};

		const handleHoverOut = (event: MouseEvent) => {
			opacity.value = withTiming(1, { duration: animationDuration });
			mouseContextRef.current.mouseIn = false;
			onHoverOut?.(event);
		};

		const handlePressIn = () => {
			opacity.value = hoverOpacity - 0.2;
		};

		const handlePressOut = () => {
			opacity.value = mouseContextRef.current.mouseIn ? hoverOpacity : 1;
		};

		const handleLongPress = (e: GestureResponderEvent) => {
			onLongPress?.(e);
		};

		return (
			<AnimatedPressable
				ref={ref}
				hitSlop={hitSlop}
				style={[containerStyle, dynamicStyle]}
				disabled={disabled}
				onHoverIn={handleHoverIn}
				onHoverOut={handleHoverOut}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				onPress={onPress}
				onLongPress={handleLongPress}
				onLayout={onLayout}
			>
				{children}
			</AnimatedPressable>
		);
	},
);

Hoverable.displayName = 'Hoverable';

export default Hoverable;
