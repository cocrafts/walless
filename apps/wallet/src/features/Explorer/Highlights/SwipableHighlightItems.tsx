import type { FC } from 'react';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import type {
	FlingGestureHandlerEventPayload,
	GestureStateChangeEvent,
} from 'react-native-gesture-handler';
import {
	Directions,
	Gesture,
	GestureDetector,
	State,
} from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import type { WidgetDocument } from '@walless/store';

import HighlightItem from './HighlightItem';

interface SwipableHighlightItemsProps {
	onSelectItem: (activeIndex: number) => void;
	activeIndex: number;
	data: WidgetDocument[];
	animatedValue: SharedValue<number>;
}

const SwipableHighlightItems: FC<SwipableHighlightItemsProps> = ({
	onSelectItem,
	activeIndex,
	data,
	animatedValue,
}) => {
	const prevIndex = useSharedValue(0);

	const handleSwipeLeft = useCallback(
		(event: GestureStateChangeEvent<FlingGestureHandlerEventPayload>) => {
			if (event.state === State.END) {
				if (activeIndex === data.length - 1) return;
				onSelectItem(activeIndex + 1);
				animatedValue.value = withTiming(activeIndex + 1);
			}
		},
		[activeIndex],
	);

	const handleSwipeRight = useCallback(
		(event: GestureStateChangeEvent<FlingGestureHandlerEventPayload>) => {
			if (event.state === State.END) {
				if (activeIndex === 0) return;
				animatedValue.value = withTiming(activeIndex - 1);
				onSelectItem(activeIndex - 1);
			}
		},
		[activeIndex],
	);

	const leftFling = Gesture.Fling()
		.direction(Directions.LEFT)
		.onFinalize(handleSwipeLeft);
	const rightFling = Gesture.Fling()
		.direction(Directions.RIGHT)
		.onFinalize(handleSwipeRight);

	return (
		<GestureDetector gesture={leftFling}>
			<GestureDetector gesture={rightFling}>
				<Animated.View style={styles.container}>
					{data.map((widget, index) => (
						<HighlightItem
							key={index.toString()}
							widget={widget}
							animation={{
								index,
								animatedValue,
								prevIndex,
								activeIndex,
								maxItems: 3,
							}}
						/>
					))}
				</Animated.View>
			</GestureDetector>
		</GestureDetector>
	);
};

export default SwipableHighlightItems;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		width: 300,
	},
});
