import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';

import Card from './Card';

const list = [
	{ title: 'Card 0', color: 'red' },
	{ title: 'Card 1', color: 'blue' },
	{ title: 'Card 2', color: 'green' },
	{ title: 'Card 3', color: 'yellow' },
	{ title: 'Card 4', color: 'pink' },
];

const Carousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const animatedValue = useSharedValue(0);
	const offsetX = useSharedValue(0);
	const MAX = 3;

	console.log('currentIndex', currentIndex);

	return (
		<View style={styles.container}>
			{list.map((card, index) => {
				if (index > MAX + currentIndex) return null;
				return (
					<Card
						key={card.title}
						title={card.title}
						color={card.color}
						index={index}
						dataLength={list.length}
						maxItems={MAX}
						currentIndex={currentIndex}
						onSwipeLeft={() => {
							animatedValue.value = withTiming(animatedValue.value + 1);

							setCurrentIndex(currentIndex + 1);
						}}
						onSwipeRight={() => {
							animatedValue.value = withTiming(animatedValue.value - 1);
							setCurrentIndex(currentIndex - 1);
						}}
						animatedValue={animatedValue}
						offsetX={offsetX}
					/>
				);
			})}
		</View>
	);
};

export default Carousel;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		height: 200,
	},
});
