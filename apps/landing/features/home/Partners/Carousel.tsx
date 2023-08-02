import { type FC, useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, View as OriginalView } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { View } from '@walless/gui';
import { resources } from 'utils/config';

interface Props {
	style?: ViewStyle;
	activeIndex: number;
	handleReachBounder: (isRightReach: boolean, isLeftReach: boolean) => void;
}

const horizontalOffset = 220;
const AnimatedView = Animated.createAnimatedComponent(OriginalView);

export const Carousel: FC<Props> = ({
	style,
	activeIndex = 0,
	handleReachBounder,
}) => {
	const images = Object.values(resources.home.partners).concat(
		Object.values(resources.home.partners),
	);

	const nextPosition = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(nextPosition.value, {
						duration: 600,
						easing: Easing.bezier(0.41, 0.03, 0.33, 0.98),
					}),
				},
			] as never[],
		};
	}, [nextPosition.value]);

	useEffect(() => {
		nextPosition.value = -1 * horizontalOffset * activeIndex;
	}, [activeIndex]);

	return (
		<View style={{ overflow: 'hidden', ...style }}>
			<AnimatedView style={[{ flexDirection: 'row' }, animatedStyle]}>
				{images.map((imageUri, idx) => (
					<Image key={idx} source={imageUri} style={styles.image} />
				))}
			</AnimatedView>
		</View>
	);
};

export default Carousel;

const styles = StyleSheet.create({
	image: {
		marginRight: 20,
		width: 200,
		height: 100,
		borderRadius: 10,
	},
});
