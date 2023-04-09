import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView, Text } from '@walless/gui';

import LayoutCard from './components/LayoutCard';
import SearchBar from './components/SearchBar';
import { Layout, mockLayoutCards } from './internal';

export const ExploreScreen: FC = () => {
	const handleSearch = (value: string) => {
		console.log(value);
	};

	const handlePressLoveBtn = (layout: Layout) => {
		console.log(layout);
	};

	return (
		<ScrollView contentContainerStyle={styles.contentContainer}>
			<Text fontSize={20} lineHeight={26} fontWeight="500">
				Choose a layout to start
			</Text>

			<SearchBar onSearch={handleSearch} />

			{mockLayoutCards.map((layoutCard) => (
				<LayoutCard
					key={layoutCard.id}
					item={layoutCard}
					onPressLoveBtn={handlePressLoveBtn}
				/>
			))}
		</ScrollView>
	);
};

export default ExploreScreen;

const styles = StyleSheet.create({
	contentContainer: {
		paddingHorizontal: 14,
		paddingVertical: 20,
		gap: 18,
		maxWidth: 400,
	},
});
