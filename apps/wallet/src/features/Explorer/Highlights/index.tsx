import { useCallback, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { View } from '@walless/gui';
import { mockWidgets } from 'state/widget';

import HighlightIndicator from './HighlightIndicator';
import SwipableHighlightItems from './SwipableHighlightItems';

const Highlights = () => {
	const [index, setIndex] = useState(0);
	const currentIndex = useSharedValue(0);

	const setActiveIndex = useCallback((activeIndex: number) => {
		setIndex(activeIndex);
		currentIndex.value = activeIndex;
	}, []);

	// useEffect(() => {
	// 	Animated.timing(scrollXAnimatedIndicator, {
	// 		toValue: scrollXIndex,
	// 		duration: 200,
	// 		useNativeDriver: true,
	// 	}).start();
	// }, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Today&apos;s Highlights</Text>
			<View style={styles.highlightList}>
				<SwipableHighlightItems
					setActiveIndex={setActiveIndex}
					activeIndex={index}
					data={mockWidgets}
					currentIndex={currentIndex}
				/>

				{/* <HighlightIndicator
					dataLength={mockWidgets.length}
					setActiveIndex={setActiveIndex}
				/> */}
			</View>
		</View>
	);
};

export default Highlights;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 16,
		minHeight: 270,
		marginVertical: 8,
		paddingHorizontal: 16,
	},
	highlightList: {
		flexGrow: 1,
		flexDirection: 'row',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#ffffff',
	},
});
