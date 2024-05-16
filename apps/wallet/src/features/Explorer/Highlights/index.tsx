import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { mockLayoutCards } from 'browser/kernel/utils/mockExtension';

import SwipableHighlightItems from '../SwipableHighlightItems';

import HighlightIndicator from './HighlightIndicator';

const Highlights = () => {
	const [index, setIndex] = useState(0);
	const scrollXIndex = useRef(new Animated.Value(0)).current;
	const scrollXAnimated = useRef(new Animated.Value(0)).current;
	const scrollXAnimatedIndicator = useRef(new Animated.Value(0)).current;

	const setActiveIndex = useCallback((activeIndex: number) => {
		setIndex(activeIndex);
		scrollXIndex.setValue(activeIndex);
	}, []);

	useEffect(() => {
		Animated.spring(scrollXAnimated, {
			toValue: scrollXIndex,
			useNativeDriver: true,
		}).start();

		Animated.timing(scrollXAnimatedIndicator, {
			toValue: scrollXIndex,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Today&apos;s Highlights</Text>
			<View style={styles.highlightList}>
				<SwipableHighlightItems
					setActiveIndex={setActiveIndex}
					activeIndex={index}
					data={mockLayoutCards}
					scrollXIndex={scrollXIndex}
				/>

				<HighlightIndicator
					dataLength={mockLayoutCards.length}
					setActiveIndex={setActiveIndex}
					scrollXIndex={scrollXIndex}
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
