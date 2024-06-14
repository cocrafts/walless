import type { FC } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { WidgetType } from '@walless/core';
import type { WidgetDocument } from '@walless/store';
import { mockWidgets } from 'state/widget';

import CategoryButton from './CategoryButton';

interface CategoryButtonsProps {
	setWidgets: (widgets: WidgetDocument[]) => void;
}

const CategoryButtons: FC<CategoryButtonsProps> = ({ setWidgets }) => {
	const currentIndex = useSharedValue(0);
	const animatedValue = useSharedValue(0);
	const categories = Object.values(WidgetType);

	const inputRange = categories.map((_, index) => index);

	const handleCategoryPress = (activeIndex: number, category: WidgetType) => {
		currentIndex.value = activeIndex;
		animatedValue.value = withTiming(activeIndex);
		const filteredLayoutCards = mockWidgets.filter(
			(item) => item.widgetType === category,
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
