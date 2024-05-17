import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { WidgetType } from '@walless/core';
import type { WidgetDocument } from '@walless/store';
import { mockLayoutCards } from 'browser/kernel/utils/mockExtension';

import CategoryButton from './CategoryButton';

interface CategoryButtonsProps {
	setWidgets: (widgets: WidgetDocument[]) => void;
}

const CategoryButtons: FC<CategoryButtonsProps> = ({ setWidgets }) => {
	const scrollXIndex = useRef(new Animated.Value(0)).current;
	const scrollXAnimated = useRef(new Animated.Value(0)).current;
	const categories = Object.values(WidgetType);

	const borderColor = '#23303C';
	const color = '#A4B3C1';
	const inputRange = categories.map((_, index) => index);
	const outputRange = categories.map(() => ({
		borderColor,
		color,
	}));

	const handleCategoryPress = (index: number, category: WidgetType) => {
		scrollXIndex.setValue(index);
		const filteredLayoutCards = mockLayoutCards.filter(
			(item) => item.widgetType === category,
		);
		setWidgets(filteredLayoutCards);
	};

	useEffect(() => {
		Animated.timing(scrollXAnimated, {
			toValue: scrollXIndex,
			easing: Easing.linear,
			duration: 200,
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
