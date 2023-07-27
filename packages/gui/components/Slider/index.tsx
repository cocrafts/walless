import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import type {
	LayoutChangeEvent,
	LayoutRectangle,
	ViewStyle,
} from 'react-native';
import { View } from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';

import { idleLayout } from '../../utils/style';

import ItemContainer from './ItemContainer';
import type { SlideAnimator, SlideOption, SliderHandle } from './shared';
import { slideAnimators } from './shared';

interface Props {
	style?: ViewStyle;
	slideContainerStyle?: ViewStyle;
	items: SlideOption[];
	activeItem: SlideOption;
	onItemSelect?: (item: SlideOption) => void;
	animator?: SlideAnimator;
}

export const Slider = forwardRef<SliderHandle, Props>(
	(
		{
			style,
			slideContainerStyle,
			items,
			activeItem,
			animator = slideAnimators.fade,
		},
		ref,
	) => {
		const [innerActive, setInnerActive] = useState(activeItem);
		const activeIndex = items.findIndex((i) => i.id === innerActive.id);
		const [layout, setLayout] = useState<LayoutRectangle>(idleLayout);
		const offset = useSharedValue(-layout.width * activeIndex);

		const handleItemSelect = (item: SlideOption) => {
			const nextIndex = items.findIndex((i) => i.id === item.id);

			offset.value = withSpring(-layout.width * nextIndex);
			setInnerActive(item);
		};

		const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
			setLayout(nativeEvent.layout);
		};

		const navigator = {
			slideNext: () => {
				const nextIndex = activeIndex + 1;
				const safeIndex = nextIndex > items.length - 1 ? 0 : nextIndex;
				handleItemSelect(items[safeIndex]);
			},
			slideBack: () => {
				const previousIndex = activeIndex - 1;
				const safeIndex = previousIndex < 0 ? items.length - 1 : previousIndex;
				handleItemSelect(items[safeIndex]);
			},
			slideTo: (index: number) => {
				if (index > -1 && index < items.length) {
					handleItemSelect(items[index]);
				}
			},
		};

		useImperativeHandle(ref, () => navigator);

		useEffect(() => handleItemSelect(activeItem), [activeItem]);

		return (
			<View onLayout={handleLayout} style={style}>
				{layout.width > 0 &&
					items.map((item, index) => {
						const { id, component: InnerComponent } = item;

						return (
							<ItemContainer
								key={id}
								index={index}
								activatedIndex={activeIndex}
								style={slideContainerStyle}
								containerLayout={layout}
								animatedOffset={offset}
								animator={animator}
							>
								<InnerComponent
									item={item}
									navigator={navigator}
									activedId={innerActive.id}
								/>
							</ItemContainer>
						);
					})}
			</View>
		);
	},
);

Slider.displayName = 'Slider';

export default Slider;

export * from './shared';
