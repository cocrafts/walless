import type { FC, ReactNode } from 'react';
import type { LayoutChangeEvent, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import type { GestureUpdater } from '../states/modal';

import { AnimatedView } from './aliased';

interface Props {
	children: ReactNode;
	style?: ViewStyle | ViewStyle[];
	gestureEnable?: boolean;
	callbackOnClose?: () => void;
}

export const SwipeDownGesture: FC<Props> = ({
	children,
	style,
	gestureEnable = false,
	callbackOnClose,
}) => {
	const offset = useSharedValue(0);
	const context = useSharedValue(0);
	const modalHeight = useSharedValue(0);

	const onContainerLayout: (event: LayoutChangeEvent) => void = ({
		nativeEvent,
	}) => {
		modalHeight.value = nativeEvent.layout.height;
	};

	const onGestureStart = () => {
		context.value = offset.value;
	};

	const onGestureUpdate: GestureUpdater = (event) => {
		const newPosition = event.translationY + context.value;
		if (newPosition > 0) {
			offset.value = newPosition;
		}
	};

	const onGestureEnd: GestureUpdater = (event) => {
		const newPosition = event.translationY + context.value;
		if (newPosition > 100) {
			offset.value = withTiming(modalHeight.value);
			callbackOnClose?.();
		} else {
			offset.value = withTiming(0);
		}
	};

	const pan = Gesture.Pan()
		.onStart(onGestureStart)
		.onUpdate(onGestureUpdate)
		.onEnd(onGestureEnd)
		.enabled(gestureEnable);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: offset.value }],
		};
	}, [offset]);

	return (
		<GestureHandlerRootView style={styles.container}>
			<GestureDetector gesture={pan}>
				<AnimatedView
					style={[style, animatedStyle]}
					onLayout={onContainerLayout}
				>
					{children}
				</AnimatedView>
			</GestureDetector>
		</GestureHandlerRootView>
	);
};

export default SwipeDownGesture;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
