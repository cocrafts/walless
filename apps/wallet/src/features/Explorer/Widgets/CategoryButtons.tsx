import type { FC } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { SubcategoryToCategoryMapping, WidgetCategories } from '@walless/core';
import type { WidgetDocument } from '@walless/store';

import CategoryButton from './CategoryButton';

interface CategoryButtonsProps {
	widgets: WidgetDocument[];
	setWidgets: (widgets: WidgetDocument[]) => void;
}

const CategoryButtons: FC<CategoryButtonsProps> = ({ widgets, setWidgets }) => {
	const currentIndex = useSharedValue(0);
	const animatedValue = useSharedValue(0);
	const categories = Object.values(WidgetCategories);

	const inputRange = categories.map((_, index) => index);

	const handleCategoryPress = (
		activeIndex: number,
		category: WidgetCategories,
	) => {
		currentIndex.value = activeIndex;
		animatedValue.value = withTiming(activeIndex);

		const filteredLayoutCards = widgets.filter(
			(widget) => SubcategoryToCategoryMapping[widget.category] === category,
		);
		setWidgets(filteredLayoutCards);
	};

	return (
		<Animated.View style={styles.container}>
			{categories.map((category, index) => (
				<CategoryButton
					key={category}
					index={index}
					title={category}
					animatedValue={animatedValue}
					data={inputRange}
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
