import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import type { WidgetDocument } from '@walless/store';

import Card from './Card';

const MAX = 3;

interface Props {
	widgets: WidgetDocument[];
	currentIndex: number;
	onSelectItem: (index: number) => void;
}

const CardCarousel: FC<Props> = ({ widgets, currentIndex, onSelectItem }) => {
	const animatedValue = useSharedValue(0);
	const offsetX = useSharedValue(0);

	const handleSwipeLeft = () => {
		animatedValue.value = withTiming(animatedValue.value + 1);
		onSelectItem(currentIndex + 1);
	};

	const handleSwipeRight = () => {
		animatedValue.value = withTiming(animatedValue.value - 1);
		onSelectItem(currentIndex - 1);
	};

	return (
		<View style={styles.container}>
			{widgets.map((card, index) => {
				if (index > MAX + currentIndex) return null;
				return (
					<Card
						key={card._id}
						widget={card}
						index={index}
						dataLength={widgets.length}
						maxItems={MAX}
						currentIndex={currentIndex}
						onSwipeLeft={handleSwipeLeft}
						onSwipeRight={handleSwipeRight}
						animatedValue={animatedValue}
						offsetX={offsetX}
					/>
				);
			})}
		</View>
	);
};

export default CardCarousel;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		height: 200,
		maxWidth: 336,
	},
});
