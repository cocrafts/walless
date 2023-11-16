import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { View } from '@walless/gui';

import PaginatedItem from './PaginatedItem';

interface Props {
	style?: ViewStyle;
	dotSize?: number;
	dotColor?: { active: string; inActive: string };
	carouselItemWidth?: number;
	initialIndex?: number;
	onPress?: (index: number) => void;
	data: unknown[];
}

export const Pagination: FC<Props> = ({
	style,
	dotSize = 8,
	dotColor = { active: '#0694d3', inActive: '#566674' },
	carouselItemWidth,
	initialIndex = 0,
	onPress,
	data,
}) => {
	const currentIndex = useSharedValue(initialIndex);

	return (
		<View horizontal style={[styles.container, style]}>
			{data.map((_, idx) => {
				return (
					<PaginatedItem
						key={idx}
						dotColor={dotColor}
						dotSize={dotSize}
						currentIndex={currentIndex}
						index={idx}
						carouselItemWidth={carouselItemWidth}
						onPress={onPress}
					/>
				);
			})}
		</View>
	);
};

export default Pagination;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
	},
});
