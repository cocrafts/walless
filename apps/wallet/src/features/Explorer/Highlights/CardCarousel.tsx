import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import type { WidgetDocument } from '@walless/store';

import Card from './Card';

const SWIPE_THRESHOLD = 10;
const MAX_X_OFFSET = 50;

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
			} else {
				xOffset.value = withTiming(0);
			}
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
							xOffsetShareValue={xOffset}
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
