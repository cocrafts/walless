import { type FC, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import IndicatorDot from './IndicatorDot';

interface HighlightIndicatorProps {
	scrollXIndex: Animated.Value;
	dataLength: number;
	setActiveIndex: (index: number) => void;
}

const HighlightIndicator: FC<HighlightIndicatorProps> = ({
	dataLength,
	setActiveIndex,
	scrollXIndex,
}) => {
	const scrollXAnimated = useRef(new Animated.Value(0)).current;
	const data = Array.from({ length: dataLength }, (_, i) => i);

	const backgroundColor = '#566674';

	const height = 6;

	const inputRange = data;
	const outputRange = Array.from({ length: dataLength }, () => ({
		height,
		backgroundColor,
	}));

	useEffect(() => {
		Animated.timing(scrollXAnimated, {
			toValue: scrollXIndex,
			duration: 200,
			useNativeDriver: true,
		}).start();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				keyExtractor={(_, index) => index.toString()}
				data={data}
				renderItem={({ item }) => {
					return (
						<IndicatorDot
							index={item}
							setActiveIndex={setActiveIndex}
							scrollXAnimated={scrollXAnimated}
							inputRange={inputRange}
							outputRange={outputRange}
						/>
					);
				}}
			/>
		</View>
	);
};

export default HighlightIndicator;

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
	},
});
