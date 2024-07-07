import { type FC, useEffect, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import type { GestureStateManager } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue } from 'react-native-reanimated';
import type { WidgetDocument } from '@walless/store';

import Card from './Card';
import { MAX_X_OFFSET, SWIPE_THRESHOLD } from './shared';

interface Props {
	widgets: WidgetDocument[];
	currentIndex: number;
	onChangeCurrentIndex: (index: number) => void;
}

const CardCarousel: FC<Props> = ({
	widgets,
	currentIndex,
	onChangeCurrentIndex,
}) => {
	const gestureStateManager = useRef<GestureStateManager>();
	const pressed = useRef(false);
	const autoSwipeDirection = useRef(-1);
	const xOffset = useSharedValue(0);

	const handleSwipeLeft = () => {
		onChangeCurrentIndex(currentIndex + 1);
	};

	const handleSwipeRight = () => {
		onChangeCurrentIndex(currentIndex - 1);
	};

	const pan = Gesture.Pan()
		.onUpdate((event) => {
			pressed.current = true;
			if (currentIndex === widgets.length - 1 && event.translationX < 0) return;
			if (currentIndex === 0 && event.translationX > 0) return;

			if (Math.abs(event.translationX) < MAX_X_OFFSET)
				xOffset.value = event.translationX;
		})
		.onFinalize(() => {
			pressed.current = false;
			if (
				xOffset.value < -SWIPE_THRESHOLD &&
				currentIndex < widgets.length - 1
			) {
				runOnJS(handleSwipeLeft)();
			} else if (xOffset.value > SWIPE_THRESHOLD && currentIndex > 0) {
				runOnJS(handleSwipeRight)();
			}

			xOffset.value = 0;
		})
		// fix Gesture got stuck when moving out of gesture area, get state manager for manual end gesture
		.onTouchesDown((_, stateManager) => {
			gestureStateManager.current = stateManager;
		});

	useEffect(() => {
		const timer = setTimeout(() => {
			if (pressed.current) return;
			if (currentIndex == widgets.length - 1) {
				autoSwipeDirection.current = -1;
			} else if (currentIndex === 0) {
				autoSwipeDirection.current = 1;
			}

			onChangeCurrentIndex(currentIndex + autoSwipeDirection.current);
		}, 2000);

		return () => clearTimeout(timer);
	}, [currentIndex, pressed]);

	// manually end gesture when having any mouse up on web
	useEffect(() => {
		if (Platform.OS !== 'web') return;

		const handlePointerUp = () => {
			gestureStateManager.current?.end();
		};

		window.addEventListener('pointerup', handlePointerUp);

		return () => {
			window.removeEventListener('pointerup', handlePointerUp);
		};
	}, []);

	return (
		<GestureDetector gesture={pan}>
			<View style={styles.container}>
				{widgets.map((card, index) => {
					return (
						<Card
							key={card._id}
							widget={card}
							index={index}
							currentIndex={currentIndex}
							dataLength={widgets.length}
							dragXOffset={xOffset}
						/>
					);
				})}
			</View>
		</GestureDetector>
	);
};

export default CardCarousel;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		cursor: 'pointer',
	},
});
