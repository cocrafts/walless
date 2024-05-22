import type { FC } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { Animated, FlatList, StyleSheet } from 'react-native';
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
import { Easing } from 'react-native-reanimated';
import { View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';
import { useWidgets } from 'utils/hooks';
import { navigate } from 'utils/navigation';
import { addWidgetToStorage } from 'utils/storage';

import HighlightItem from './HighlightItem';

interface SwipableHighlightItemsProps {
	setActiveIndex: (activeIndex: number) => void;
	activeIndex: number;
	data: WidgetDocument[];
	scrollXIndex: Animated.Value;
}

const SwipableHighlightItems: FC<SwipableHighlightItemsProps> = ({
	setActiveIndex,
	activeIndex,
	data,
	scrollXIndex,
}) => {
	const scrollXAnimated = useRef(new Animated.Value(0)).current;
	const activeWidgets = useWidgets().map((widget) => widget._id);

	const leftFling = Gesture.Fling();
	const rightFling = Gesture.Fling();

	const handleSwipeLeft = useCallback(
		(event: GestureStateChangeEvent<FlingGestureHandlerEventPayload>) => {
			if (event.state === State.END) {
				if (activeIndex === data.length - 1) return;
				setActiveIndex(activeIndex + 1);
			}
		},
		[activeIndex],
	);

	const handleSwipeRight = useCallback(
		(event: GestureStateChangeEvent<FlingGestureHandlerEventPayload>) => {
			if (event.state === State.END) {
				if (activeIndex === 0) return;
				setActiveIndex(activeIndex - 1);
			}
		},
		[activeIndex],
	);

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

	useEffect(() => {
		Animated.timing(scrollXAnimated, {
			toValue: scrollXIndex,
			easing: Easing.inOut(Easing.ease),
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<GestureDetector
			gesture={leftFling.direction(Directions.LEFT).onFinalize(handleSwipeLeft)}
		>
			<GestureDetector
				gesture={rightFling
					.direction(Directions.RIGHT)
					.onFinalize(handleSwipeRight)}
			>
				<FlatList
					scrollEventThrottle={16}
					bounces={false}
					keyExtractor={(_, index) => index.toString()}
					scrollEnabled={false}
					data={data}
					horizontal
					inverted
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.container}
					CellRendererComponent={({ children, index, style, ...props }) => {
						const newStyle = [style, { zIndex: data.length - index }];
						return (
							<View style={newStyle} index={index} {...props}>
								{children}
							</View>
						);
					}}
					renderItem={({ item, index }) => {
						return (
							<HighlightItem
								key={index.toString()}
								widget={item}
								animation={{ index, scrollXAnimated, maxItems: 3 }}
								onPress={() => {
									if (activeWidgets.includes(item._id)) {
										handleOpenWidget(item._id);
										return;
									}
									handleAddWidget(item);
								}}
								isAdded={activeWidgets.includes(item._id)}
							/>
						);
					}}
				/>
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
