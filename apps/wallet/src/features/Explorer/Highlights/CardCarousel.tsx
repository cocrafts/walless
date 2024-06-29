import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
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
	const xOffset = useSharedValue(0);

	const handleSwipeLeft = () => {
		onChangeCurrentIndex(currentIndex + 1);
	};

	const handleSwipeRight = () => {
		onChangeCurrentIndex(currentIndex - 1);
	};

	const pan = Gesture.Pan()
		.onUpdate((event) => {
			if (currentIndex === widgets.length - 1 && event.translationX < 0) return;
			if (currentIndex === 0 && event.translationX > 0) return;

			if (Math.abs(event.translationX) < MAX_X_OFFSET)
				xOffset.value = event.translationX;
		})
		.onFinalize(() => {
			if (
				xOffset.value < -SWIPE_THRESHOLD &&
				currentIndex < widgets.length - 1
			) {
				runOnJS(handleSwipeLeft)();
			} else if (xOffset.value > SWIPE_THRESHOLD && currentIndex > 0) {
				runOnJS(handleSwipeRight)();
			}

			xOffset.value = 0;
		});

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
