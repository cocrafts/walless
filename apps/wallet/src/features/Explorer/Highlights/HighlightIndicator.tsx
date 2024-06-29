import type { FC } from 'react';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

import IndicatorDot from './IndicatorDot';

interface HighlightIndicatorProps {
	currentIndex: number;
	dataLength: number;
}

const HighlightIndicator: FC<HighlightIndicatorProps> = ({
	currentIndex,
	dataLength,
}) => {
	const indexes = useMemo(() => {
		return Array.from({ length: dataLength }, (_, i) => i);
	}, [dataLength]);

	return (
		<View style={styles.container}>
			{indexes.map((index) => {
				return (
					<IndicatorDot key={index} index={index} currentIndex={currentIndex} />
				);
			})}
		</View>
	);
};

export default HighlightIndicator;

const styles = StyleSheet.create({
	container: {},
});
