import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

import CategoryButton from './CategoryButton';

enum Category {
	NETWORK = 'Network',
	GAME = 'Game',
	DEFI = 'DeFi',
	NFT = 'NFT',
}

const CategoryButtons = () => {
	const scrollXIndex = useRef(new Animated.Value(0)).current;
	const scrollXAnimated = useRef(new Animated.Value(0)).current;
	const categories = Object.values(Category);

	const borderColor = '#23303C';
	const color = '#A4B3C1';
	const inputRange = categories.map((_, index) => index);
	const outputRange = categories.map(() => ({
		borderColor,
		color,
	}));

	const handleCategoryPress = (index: number) => {
		scrollXIndex.setValue(index);
	};

	useEffect(() => {
		Animated.spring(scrollXAnimated, {
			toValue: scrollXIndex,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<Animated.View style={styles.container}>
			{categories.map((category, index) => (
				<CategoryButton
					key={category}
					index={index}
					title={category}
					scrollXAnimated={scrollXAnimated}
					inputRange={inputRange}
					outputRange={outputRange}
					onPress={handleCategoryPress}
				/>
			))}
		</Animated.View>
	);
};

export default CategoryButtons;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
	},
});
