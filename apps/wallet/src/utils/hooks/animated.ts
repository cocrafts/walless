import { useEffect } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

export interface OpacityAnimatedOptions {
	from: number;
	to: number;
	duration?: number;
}

export const useOpacityAnimated = ({
	from,
	to,
	duration = 200,
}: OpacityAnimatedOptions) => {
	const opacity = useSharedValue(from);
	const style = useAnimatedStyle(
		() => ({
			opacity: opacity.value,
		}),
		[opacity],
	);

	useEffect(() => {
		opacity.value = withTiming(to, { duration });
	}, []);

	return {
		style,
		opacity,
	};
};
