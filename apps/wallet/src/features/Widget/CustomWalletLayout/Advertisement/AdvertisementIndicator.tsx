import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { WithTimingConfig } from 'react-native-reanimated';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

interface Props {
	index: number;
	currentIndex: number;
}
const AdvertisementIndicator: FC<Props> = ({ currentIndex, index }) => {
	const animatedStyle = useAnimatedStyle(() => {
		const opacity = currentIndex === index ? 1 : 0.3;
		const config: WithTimingConfig = { duration: 650 };

		return {
			opacity: withTiming(opacity, config),
		};
	}, [currentIndex]);

	return <Animated.View style={[styles.indicator, animatedStyle]} />;
};

export default AdvertisementIndicator;

const styles = StyleSheet.create({
	indicator: {
		width: 28,
		height: 4,
		backgroundColor: '#ffffff',
		borderRadius: 4,
	},
});
