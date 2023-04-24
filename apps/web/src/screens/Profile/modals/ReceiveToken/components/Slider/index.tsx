import { type FC, useEffect, useState } from 'react';
import {
	type LayoutChangeEvent,
	type LayoutRectangle,
	type ViewStyle,
} from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedView, Hoverable, idleLayout, Text, View } from '@walless/gui';

import { IndicatorOption, SlideOption } from './shared';

interface Props {
	style?: ViewStyle;
	items: SlideOption[];
	distance: number;
	activeItem: SlideOption;
	onItemSelect?: (item: SlideOption) => void;
	indicator?: IndicatorOption;
}

export const Slider: FC<Props> = ({
	style,
	items,
	distance,
	activeItem,
	indicator,
}) => {
	const [innerActive, setInnerActive] = useState(activeItem);
	const [activeIndex, setActiveIndex] = useState(0);
	// const activeIndex = items.findIndex((i) => i.id === innerActive.id);
	const [containerLayout, setContainerLayout] =
		useState<LayoutRectangle>(idleLayout);
	const offset = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(
		() => ({
			flexDirection: 'row',
			transform: [{ translateX: offset.value }],
		}),
		[offset],
	);

	useEffect(() => setInnerActive(activeItem), [activeItem]);

	const handleItemSelect = (index: number) => {
		// const nextIndex = (activeIndex + 1) % items.length;
		offset.value = withTiming(distance * index, {});

		setActiveIndex(index);
		setInnerActive(items[index]);
	};

	const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setContainerLayout(nativeEvent.layout);
		console.log('onLayout: nativeEvent.layout', nativeEvent.layout);
	};

	const Indicator = indicator?.component || (() => null);

	return (
		<View onLayout={handleLayout} style={style}>
			<AnimatedView style={animatedStyle}>
				{true &&
					items.map((item) => {
						const { id, component: InnerComponent } = item;

						return (
							<View key={id}>
								<InnerComponent config={item} />
							</View>
						);
					})}
			</AnimatedView>

			<View>
				{indicator && (
					<Indicator
						config={{
							component: Indicator,
							context: indicator.context,
							currentActiveIndex: activeIndex,
							setCurrentActiveIndex: handleItemSelect,
						}}
					/>
				)}
			</View>
		</View>
	);
};

export default Slider;

export * from './shared';
