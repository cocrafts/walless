import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import type {
	GestureStateChangeEvent,
	GestureUpdateEvent,
	PanGestureChangeEventPayload,
	PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { Gesture, GestureDetector, State } from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
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
	const [width, setWidth] = useState(0);
	const offsetX = useSharedValue(0);

	const handleSwipeLeft = useCallback(
		(event: GestureStateChangeEvent<PanGestureHandlerEventPayload>) => {
			if (event.state === State.END) {
				offsetX.value = 0;

				if (event.translationX > 0) {
					if (activeIndex === 0) return;

					onSelectItem(activeIndex - 1);
					animatedValue.value = withTiming(activeIndex - 1);
				} else {
					if (activeIndex === data.length - 1) return;

					onSelectItem(activeIndex + 1);
					animatedValue.value = withTiming(activeIndex + 1);
				}
			}
		},
		[activeIndex],
	);

	const leftFling = Gesture.Pan()
		.onChange(
			(
				event: GestureUpdateEvent<
					PanGestureHandlerEventPayload & PanGestureChangeEventPayload
				>,
			) => {
				if (event.translationX < 0 && activeIndex === data.length - 1) return;
				if (offsetX.value >= width - 273) return;

				offsetX.value = withSpring(event.translationX);
			},
		)
		.onFinalize(handleSwipeLeft);

	return (
		<GestureDetector gesture={leftFling}>
			<Animated.View
				style={styles.container}
				onLayout={(event) => {
					setWidth(event.nativeEvent.layout.width);
				}}
			>
				{data.map((widget, index) => (
					<HighlightItem
						key={index.toString()}
						widget={widget}
						animation={{
							index,
							animatedValue,
							activeIndex,
							offsetX,
							maxItems: 3,
						}}
					/>
				))}
			</Animated.View>
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
