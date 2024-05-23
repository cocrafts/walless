import type { FC } from 'react';
import { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import type {
	FlingGestureHandlerEventPayload,
	GestureStateChangeEvent,
} from 'react-native-gesture-handler';
import {
	Directions,
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
	State,
} from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import type { WidgetDocument } from '@walless/store';
import { mockWidgets } from 'state/widget';
import { useWidgets } from 'utils/hooks';
import { navigate } from 'utils/navigation';
import { addWidgetToStorage } from 'utils/storage';

import HighlightItem from './HighlightItem';

interface SwipableHighlightItemsProps {
	setActiveIndex: (activeIndex: number) => void;
	activeIndex: number;
	data: WidgetDocument[];
	currentIndex: SharedValue<number>;
}

const SwipableHighlightItems: FC<SwipableHighlightItemsProps> = ({
	setActiveIndex,
	activeIndex,
	data,
	currentIndex,
}) => {
	const prevIndex = useSharedValue(0);
	const animatedValue = useSharedValue(0);
	const activeWidgets = useWidgets().map((widget) => widget._id);

	const handleSwipeLeft = useCallback(
		(event: GestureStateChangeEvent<FlingGestureHandlerEventPayload>) => {
			if (event.state === State.END) {
				if (activeIndex === data.length - 1) return;
				setActiveIndex(activeIndex + 1);
				console.log('active: ', mockWidgets[activeIndex + 1]);
				animatedValue.value = withSpring(activeIndex + 1);
			}
		},
		[activeIndex],
	);

	const handleSwipeRight = useCallback(
		(event: GestureStateChangeEvent<FlingGestureHandlerEventPayload>) => {
			if (event.state === State.END) {
				if (activeIndex === 0) return;
				animatedValue.value = withSpring(activeIndex - 1);
				console.log(mockWidgets[activeIndex - 1]);
				setActiveIndex(activeIndex - 1);
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

	const handleOpenWidget = (id: string) => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Widget',
				params: {
					screen: 'Default',
					params: { id },
				},
			},
		});
	};

	const handleAddWidget = (widget: WidgetDocument) => {
		addWidgetToStorage(widget._id, widget);
		handleOpenWidget(widget._id);
	};

	return (
		<GestureHandlerRootView>
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
									currentIndex,
									prevIndex,
									setActiveIndex,
									activeIndex,
									maxItems: 3,
								}}
								onPress={() => {
									if (activeWidgets.includes(widget._id)) {
										handleOpenWidget(widget._id);
										return;
									}
									handleAddWidget(widget);
								}}
								isAdded={activeWidgets.includes(widget._id)}
							/>
						))}
					</Animated.View>
				</GestureDetector>
			</GestureDetector>
		</GestureHandlerRootView>
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
