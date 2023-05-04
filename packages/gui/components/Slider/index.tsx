import { type FC, useEffect, useState } from 'react';
import {
	type LayoutChangeEvent,
	type LayoutRectangle,
	type ViewStyle,
} from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';

import { idleLayout } from '../../utils/style';
import View from '../View';

import ItemContainer from './ItemContainer';
import { type SlideAnimator, type SlideOption, slideAnimators } from './shared';

interface Props {
	style?: ViewStyle;
	slideContainerStyle?: ViewStyle;
	items: SlideOption[];
	activeItem: SlideOption;
	onItemSelect?: (item: SlideOption) => void;
	animator?: SlideAnimator;
}

export const Slider: FC<Props> = ({
	style,
	slideContainerStyle,
	items,
	activeItem,
	animator = slideAnimators.slide,
}) => {
	const [innerActive, setInnerActive] = useState(activeItem);
	const activeIndex = items.findIndex((i) => i.id === innerActive.id);
	const [layout, setLayout] = useState<LayoutRectangle>(idleLayout);
	const offset = useSharedValue(-layout.width * activeIndex);

	useEffect(() => handleItemSelect(activeItem), [activeItem]);

	const handleItemSelect = (item: SlideOption) => {
		const nextIndex = items.findIndex((i) => i.id === item.id);

		offset.value = withSpring(-layout.width * nextIndex);
		setInnerActive(item);
	};

	const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
		setLayout(nativeEvent.layout);
	};

	return (
		<View onLayout={handleLayout} style={style}>
			{layout.width > 0 &&
				items.map((item, index) => {
					const { id, component: InnerComponent } = item;

					return (
						<ItemContainer
							key={id}
							index={index}
							style={slideContainerStyle}
							containerLayout={layout}
							animatedOffset={offset}
							animator={animator}
						>
							<InnerComponent item={item} />
						</ItemContainer>
					);
				})}
		</View>
	);
};

export default Slider;

export * from './shared';
