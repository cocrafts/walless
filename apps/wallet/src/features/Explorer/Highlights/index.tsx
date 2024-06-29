import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from '@walless/gui';
import { mockWidgets } from 'state/widget';

import CardCarousel from './CardCarousel';
import HighlightIndicator from './HighlightIndicator';

const Highlights = () => {
	const [currentIndex, setCurrentIndex] = useState(0);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Today&apos;s Highlights</Text>

			<View style={styles.highlightList}>
				<CardCarousel
					widgets={mockWidgets}
					currentIndex={currentIndex}
					onChangeCurrentIndex={setCurrentIndex}
				/>

				<HighlightIndicator
					currentIndex={currentIndex}
					dataLength={mockWidgets.length}
				/>
			</View>
		</View>
	);
};

export default Highlights;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		minHeight: 200,
		marginVertical: 8,
	},
	highlightList: {
		gap: 14,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#ffffff',
		marginLeft: 20,
	},
});
