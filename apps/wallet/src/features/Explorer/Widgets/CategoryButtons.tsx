import type { FC } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import type { CustomWalletMetadata } from '@walless/core';
import { WidgetCategory, WidgetType } from '@walless/core';
import type { WidgetDocument } from '@walless/store';
import { mockWidgets } from 'state/widget';
import { useNfts, useTokens } from 'utils/hooks';
import { filterAssetsFromCustomWalletTokens } from 'utils/widget';

import CategoryButton from './CategoryButton';

interface CategoryButtonsProps {
	setWidgets: (widgets: WidgetDocument[]) => void;
}

const CategoryButtons: FC<CategoryButtonsProps> = ({ setWidgets }) => {
	const currentIndex = useSharedValue(0);
	const animatedValue = useSharedValue(0);
	const categories = Object.values(WidgetType);
	const { tokens } = useTokens();
	const { nfts } = useNfts();

	const inputRange = categories.map((_, index) => index);

	const handleCategoryPress = (activeIndex: number, category: WidgetType) => {
		currentIndex.value = activeIndex;
		animatedValue.value = withTiming(activeIndex);
		const filteredLayoutCards = mockWidgets.filter((item) => {
			if (item.category !== WidgetCategory.CUSTOM_WALLET)
				return item.widgetType === category;

			const requiredTokens = (item?.customMetadata as CustomWalletMetadata)
				.tokens;
			const filteredTokens = filterAssetsFromCustomWalletTokens(
				requiredTokens || [],
				{
					ownedTokens: tokens,
				},
			);

			const requiredNfts = (item?.customMetadata as CustomWalletMetadata).nfts;
			const filteredNfts = filterAssetsFromCustomWalletTokens(
				requiredNfts || [],
				{
					ownedNfts: nfts,
				},
			);

			return (
				item.widgetType === category &&
				(filteredTokens.length !== 0 || filteredNfts.length !== 0)
			);
		});
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
