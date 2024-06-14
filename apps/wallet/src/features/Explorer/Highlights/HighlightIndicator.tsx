import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { View } from '@walless/gui';

import IndicatorDot from './IndicatorDot';

interface HighlightIndicatorProps {
	dataLength: number;
	onSelectItem: (index: number) => void;
	currentIndex: SharedValue<number>;
	animatedValue: SharedValue<number>;
}

const HighlightIndicator: FC<HighlightIndicatorProps> = ({
	dataLength,
	onSelectItem,
	animatedValue,
}) => {
	const data = Array.from({ length: dataLength }, (_, i) => i);

	return (
		<View style={styles.container}>
			{data.map((item) => {
				return (
					<IndicatorDot
						key={item}
						index={item}
						data={data}
						onPress={onSelectItem}
						animatedValue={animatedValue}
					/>
				);
			})}
		</View>
	);
};

export default HighlightIndicator;

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
	},
});
