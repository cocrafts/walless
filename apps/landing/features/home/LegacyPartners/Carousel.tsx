import { type FC, useEffect, useRef, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { View } from '@walless/gui';

import { partners } from './internal';

interface Props {
	style?: ViewStyle;
	activeIndex: number;
	handleReachBounder: (isRightReach: boolean, isLeftReach: boolean) => void;
}

const horizontalOffset = 220;
const AnimatedView = Animated.createAnimatedComponent(View);

export const Carousel: FC<Props> = ({
	style,
	activeIndex = 0,
	handleReachBounder,
}) => {
	const [isContentShorterThanContainer, setIsContentShorterThanContainer] =
		useState(false);

	const layoutRef = useRef({
		containerWidth: 0,
		contentWidth: partners.length * horizontalOffset,
		distanceToRightBorder: 1,
		distanceToLeftBorder: 0,
		isRightBorderReach: false,
		isLeftBorderReach: true,
	});

	const currentPosition = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(currentPosition.value, {
						duration: 600,
						easing: Easing.bezier(0.41, 0.03, 0.33, 0.98),
					}),
				},
			] as never[],
		};
	}, [currentPosition]);

	useEffect(() => {
		const next = -horizontalOffset * activeIndex;
		if (isContentShorterThanContainer) {
			layoutRef.current.isRightBorderReach = true;
			layoutRef.current.isLeftBorderReach = true;
		} else {
			layoutRef.current.distanceToLeftBorder = -next;

			layoutRef.current.distanceToRightBorder =
				layoutRef.current.contentWidth +
				next -
				layoutRef.current.containerWidth;

			layoutRef.current.isLeftBorderReach =
				layoutRef.current.distanceToLeftBorder <= 0;

			layoutRef.current.isRightBorderReach =
				layoutRef.current.distanceToRightBorder <= 0;
		}

		handleReachBounder(
			layoutRef.current.isRightBorderReach,
			layoutRef.current.isLeftBorderReach,
		);

		currentPosition.value = next;
		// This func used to control currentPosition at the right border of carousel
		// next - (layoutRef.current.isRightBorderReach ? layoutRef.current.distanceToRightBorder - 20 : 0);
	}, [activeIndex, isContentShorterThanContainer]);

	return (
		<View
			style={{ overflow: 'hidden', ...style }}
			onLayout={({ nativeEvent }) => {
				layoutRef.current.containerWidth = nativeEvent.layout.width;
				layoutRef.current.distanceToRightBorder =
					layoutRef.current.contentWidth - layoutRef.current.containerWidth;
				setIsContentShorterThanContainer(
					layoutRef.current.contentWidth < layoutRef.current.containerWidth,
				);
			}}
		>
			<AnimatedView horizontal style={animatedStyle}>
				{partners.map((partner, idx) => (
					<TouchableOpacity
						key={idx}
						style={styles.imageContainer}
						onPress={() => Linking.openURL(partner.url)}
					>
						<Image source={partner.uri} style={styles.image} />
					</TouchableOpacity>
				))}
			</AnimatedView>
		</View>
	);
};

export default Carousel;

const styles = StyleSheet.create({
	imageContainer: {
		cursor: 'pointer',
		marginRight: 20,
	},
	image: {
		width: 200,
		height: 100,
		borderRadius: 10,
	},
});
