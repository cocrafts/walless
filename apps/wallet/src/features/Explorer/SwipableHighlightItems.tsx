import type { FC } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { Animated, FlatList, StyleSheet } from 'react-native';
import type {
	FlingGestureHandlerEventPayload,
	HandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import {
	Directions,
	FlingGestureHandler,
	State,
} from 'react-native-gesture-handler';
import { View } from '@walless/gui';
import type { ExtensionDocument } from '@walless/store';

import HighlightItem from './Highlights/HighlightItem';

interface SwipableHighlightItemsProps {
	setActiveIndex: (activeIndex: number) => void;
	activeIndex: number;
	data: ExtensionDocument[];
	scrollXIndex: Animated.Value;
}

const SwipableHighlightItems: FC<SwipableHighlightItemsProps> = ({
	setActiveIndex,
	activeIndex,
	data,
	scrollXIndex,
}) => {
	const scrollXAnimated = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.spring(scrollXAnimated, {
			toValue: scrollXIndex,
			useNativeDriver: true,
		}).start();
	}, []);

	const handleSwipeLeft = useCallback(
		(event: HandlerStateChangeEvent<FlingGestureHandlerEventPayload>) => {
			if (event.nativeEvent.state === State.END) {
				if (activeIndex === data.length - 1) return;
				setActiveIndex(activeIndex + 1);
			}
		},
		[],
	);

	const handleSwipeRight = useCallback(
		(event: HandlerStateChangeEvent<FlingGestureHandlerEventPayload>) => {
			if (event.nativeEvent.state === State.END) {
				if (activeIndex === 0) return;
				setActiveIndex(activeIndex - 1);
			}
		},
		[],
	);

	return (
		<FlingGestureHandler
			key="left"
			direction={Directions.LEFT}
			onHandlerStateChange={handleSwipeLeft}
		>
			<FlingGestureHandler
				key="right"
				direction={Directions.RIGHT}
				onHandlerStateChange={handleSwipeRight}
			>
				<FlatList
					scrollEventThrottle={16}
					bounces={false}
					keyExtractor={(_, index) => index.toString()}
					data={data}
					horizontal
					inverted
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
						const { name, storeMeta, networkMeta } = item as ExtensionDocument;
						return (
							<HighlightItem
								key={index.toString()}
								title={name}
								coverUri={{ uri: storeMeta.coverUri }}
								iconUri={{ uri: networkMeta.iconUri }}
								loveCount={storeMeta.loveCount}
								activeCount={storeMeta.activeCount}
								description={storeMeta.description}
								animation={{ index, scrollXAnimated, maxItems: 3 }}
								onPress={() => setActiveIndex(index)}
							/>
						);
					}}
				/>
			</FlingGestureHandler>
		</FlingGestureHandler>
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
