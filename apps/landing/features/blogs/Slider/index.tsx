import type { FC } from 'react';
import { useState } from 'react';
import type { ViewStyle } from 'react-native';
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { AnimatedView, View } from '@walless/gui';

import type { IndicatorOption, SlideOption } from './shared';

interface Props {
	style?: ViewStyle;
	items: SlideOption[];
	distance?: number;
	onItemSelect?: (item: SlideOption) => void;
	indicator?: IndicatorOption;
}

export const Slider: FC<Props> = ({ style, items, indicator }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [itemWidth, setItemWidth] = useState(0);
	const offset = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(
		() => ({
			flexDirection: 'row',
			transform: [{ translateX: offset.value }],
		}),
		[offset],
	);

	const handleItemSelect = (index: number) => {
		offset.value = withTiming(-itemWidth * index, {});
		setActiveIndex(index);
	};

	const Indicator = indicator?.component || (() => null);

	return (
		<View style={style}>
			<View style={{ overflow: 'hidden' }}>
				<AnimatedView style={animatedStyle}>
					{items.map((item) => {
						const { id, component: InnerComponent } = item;

						return (
							<View
								key={id}
								onLayout={(event) => {
									setItemWidth(event.nativeEvent.layout.width);
								}}
							>
								<InnerComponent config={item} />
							</View>
						);
					})}
				</AnimatedView>
			</View>

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
