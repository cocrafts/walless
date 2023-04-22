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
} from 'react-native-reanimated';

import { idleLayout } from '../../utils/style';
import { AnimatedView } from '../aliased';
import Hoverable from '../Hoverable';
import Text from '../Text';
import View from '../View';

import { SlideOption } from './shared';

interface Props {
	style?: ViewStyle;
	items: SlideOption[];
	activeItem: SlideOption;
	onItemSelect?: (item: SlideOption) => void;
}

export const Slider: FC<Props> = ({ style, items, activeItem }) => {
	const [innerActive, setInnerActive] = useState(activeItem);
	const activeIndex = items.findIndex((i) => i.id === innerActive.id);
	const [containerLayout, setContainerLayout] =
		useState<LayoutRectangle>(idleLayout);
	const offset = useSharedValue(-410 * activeIndex);

	const animatedStyle = useAnimatedStyle(
		() => ({
			flexDirection: 'row',
			transform: [{ translateX: offset.value }],
		}),
		[offset],
	);

	useEffect(() => setInnerActive(activeItem), [activeItem]);

	const handleItemSelect = (item: SlideOption) => {
		const nextIndex = items.findIndex((i) => i.id === item.id);

		offset.value = withSpring(-410 * nextIndex, {});
		console.log(-410 * nextIndex);
		setInnerActive(item);
	};

	const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setContainerLayout(nativeEvent.layout);
	};

	return (
		<View onLayout={handleLayout} style={style}>
			<AnimatedView style={animatedStyle}>
				{containerLayout.width > 0 &&
					items.map((item) => {
						const { id, component: InnerComponent } = item;
						const wrapperStyle = {
							width: containerLayout.width,
							height: containerLayout.height,
							backgroundColor: '#222222',
						};

						return (
							<View key={id} style={wrapperStyle}>
								<InnerComponent item={item} />
							</View>
						);
					})}
			</AnimatedView>
			<View
				style={{
					flexDirection: 'row',
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
				}}
			>
				<Hoverable onPress={() => handleItemSelect(items[0])}>
					<Text>Next</Text>
				</Hoverable>
				<Hoverable onPress={() => handleItemSelect(items[1])}>
					<Text>Prev</Text>
				</Hoverable>
			</View>
		</View>
	);
};

export default Slider;

export * from './shared';
