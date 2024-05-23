import type { FC } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { View } from '@walless/gui';

import IndicatorDot from './IndicatorDot';

interface HighlightIndicatorProps {
	dataLength: number;
	setActiveIndex: (index: number) => void;
	currentIndex: SharedValue<number>;
	animatedValue: SharedValue<number>;
}

const HighlightIndicator: FC<HighlightIndicatorProps> = ({
	dataLength,
	setActiveIndex,
	animatedValue,
}) => {
	const data = Array.from({ length: dataLength }, (_, i) => i);

	const height = 6;

	const inputRange = data;
	const outputRange = Array.from({ length: dataLength }, () => ({
		height,
	}));

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
							animatedValue={animatedValue}
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
