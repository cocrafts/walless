import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
	type LayoutChangeEvent,
	type LayoutRectangle,
	type ViewStyle,
	View,
} from 'react-native';
import { useSharedValue, withSpring } from 'react-native-reanimated';

import { idleLayout } from '../../utils/style';

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

export interface SliderHandle {
	slideNext: () => void;
	slideBack: () => void;
	slideTo: (index: number) => void;
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

		useImperativeHandle(ref, () => ({
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
			slideTo: (index) => {
				if (index > 0 && index < items.length - 1) {
					handleItemSelect(items[index]);
				}
			},
		}));

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
								<InnerComponent item={item} />
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
