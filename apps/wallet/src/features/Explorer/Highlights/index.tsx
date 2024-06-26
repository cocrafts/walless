import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { View } from '@walless/gui';
import { mockWidgets } from 'state/widget';

import CardCarousel from './CardCarousel';
import HighlightIndicator from './HighlightIndicator';

const Highlights = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const animatedValue = useSharedValue(0);

	useEffect(() => {
		animatedValue.value = withTiming(currentIndex);
	}, [currentIndex]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Today&apos;s Highlights</Text>

			<View style={styles.highlightList}>
				<CardCarousel
					data={mockWidgets}
					currentIndex={currentIndex}
					onSelectItem={setCurrentIndex}
				/>

				<HighlightIndicator
					animatedValue={animatedValue}
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
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#ffffff',
		marginLeft: 20,
	},
});
