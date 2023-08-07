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

export const Carousel: FC<Props> = ({ style }) => {
	const layoutRef = useRef({
		containerWidth: 0,
		contentWidth: 0,
		itemWidth: 0,
		distanceToRightBorder: 1,
		distanceToLeftBorder: 0,
		isRightBorderReach: false,
		isLeftBorderReach: true,
	});

	const currentPosition = useSharedValue(0);

	const handleSlideRight = () => {
		if (currentPosition.value > 0) {
			currentPosition.value = -layoutRef.current.contentWidth;
		}

		currentPosition.value = withTiming(
			currentPosition.value + layoutRef.current.itemWidth,
			{ duration: 600, easing: Easing.bezier(0.41, 0.03, 0.33, 0.98) },
		);
	};

	const handleSlideLeft = () => {
		if (currentPosition.value < -2 * layoutRef.current.contentWidth) {
			currentPosition.value = -layoutRef.current.contentWidth;
		}
		currentPosition.value = withTiming(
			currentPosition.value - layoutRef.current.itemWidth,
			{ duration: 600, easing: Easing.bezier(0.41, 0.03, 0.33, 0.98) },
		);
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: currentPosition.value,
				},
			] as never[],
		};
	}, [currentPosition]);

	useEffect(() => {
		setInterval(handleSlideLeft, 2500);
	}, []);

	return (
		<View
			horizontal
			style={{ overflow: 'hidden', ...style }}
			onLayout={({ nativeEvent }) => {
				layoutRef.current.containerWidth = nativeEvent.layout.width;
			}}
		>
			<AnimatedView
				horizontal
				style={animatedStyle}
				onLayout={({ nativeEvent }) => {
					layoutRef.current.contentWidth = nativeEvent.layout.width;
					currentPosition.value = -nativeEvent.layout.width;
				}}
			>
				{partners.map((partner, idx) => (
					<TouchableOpacity
						key={idx}
						style={styles.imageContainer}
						onPress={() => Linking.openURL(partner.url)}
						onLayout={({ nativeEvent }) => {
							layoutRef.current.itemWidth = nativeEvent.layout.width;
						}}
					>
						<Image source={partner.uri} style={styles.image} />
					</TouchableOpacity>
				))}
			</AnimatedView>
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
	},
	image: {
		width: 200,
		height: 100,
		marginRight: 20,
		borderRadius: 10,
	},
});
