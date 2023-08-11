// TODO: complete the Carousel component
import type { FC } from 'react';
import { Fragment, useEffect, useRef } from 'react';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import type { CarouselItem, CarouselItemRenderer } from './shared';

interface Props {
	horizontal?: boolean;
	itemSize: number;
	speed?: number;
	items: Array<CarouselItem>;
	renderItem: CarouselItemRenderer;
}

export const Carousel: FC<Props> = ({
	// horizontal,
	// itemSize,
	speed = 600,
	items,
	renderItem,
}) => {
	const index = useRef(0);
	const offset = useSharedValue(0);
	const containerStyle = useAnimatedStyle(
		() => ({
			flexDirection: 'row',
			transform: [{ translateX: offset.value }] as never[],
		}),
		[offset],
	);

	useEffect(() => {
		const tick = setInterval(() => {
			// if (true) {
			// 	offset.value = 0;
			// 	index.current = 1;
			// }
			index.current = index.current + 1;
			const nextOffset = 220 * index.current;
			offset.value = withTiming(nextOffset, { duration: 200 });
		}, speed);

		return () => clearInterval(tick);
	}, []);

	return (
		<Animated.View style={containerStyle}>
			{items.map((item, index) => {
				const element = renderItem({ item, index });
				return <Fragment key={item.id}>{element}</Fragment>;
			})}
		</Animated.View>
	);
};

export default Carousel;

export * from './shared';
