import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { View } from '@walless/gui';

import IndicatorDot from './IndicatorDot';

interface HighlightIndicatorProps {
	dataLength: number;
	animatedValue: SharedValue<number>;
}

const HighlightIndicator: FC<HighlightIndicatorProps> = ({
	dataLength,
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
						animatedValue={animatedValue}
					/>
				);
			})}
		</View>
	);
};

export default HighlightIndicator;

const styles = StyleSheet.create({
	container: {},
});
