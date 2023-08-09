import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { View } from '@walless/gui';
import { debounce } from 'lodash';
import { resources } from 'utils/config';

interface Props {
	style?: ViewStyle;
}

const AnimatedView = Animated.createAnimatedComponent(View);
const partners = Object.values(resources.home.partners);
const partnersList = [...partners, ...partners, ...partners, ...partners];
const timeout = 2300;
const duration = 600;

export const Carousel = forwardRef(function Carousel({ style }: Props, ref) {
	const start = 6;
	const end = 14;
	const currentPosition = useSharedValue(-440);
	const [renderArr, setRenderArr] = useState(
		partnersList.slice(start, end + 1),
	);
	const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
	const [autoSlide, setAutoSlide] = useState(true);

	useImperativeHandle(ref, () => ({
		handleSlideLeftPress: () => {
			setAutoSlide(false);
			handleSlideLeft();
		},
		handleSlideRightPress: () => {
			setAutoSlide(false);
			handleSlideRight();
		},
	}));

	const handleSlideLeft = () => {
		currentPosition.value = withTiming(currentPosition.value - 220, {
			duration,
		});

		setTimeout(() => {
			currentPosition.value = currentPosition.value + 220;
			partnersList.push(partnersList[0]);
			partnersList.shift();
			setRenderArr(partnersList.slice(start, end + 1));
		}, duration + 100);
	};

	const handleSlideRight = () => {
		currentPosition.value = withTiming(currentPosition.value + 220, {
			duration,
		});

		setTimeout(() => {
			currentPosition.value = currentPosition.value - 220;
			partnersList.unshift(partnersList[partnersList.length - 1]);
			partnersList.pop();
			setRenderArr(partnersList.slice(start, end + 1));
		}, duration + 100);
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
		const id = setInterval(debounce(handleSlideRight, timeout), timeout + 100);
		setIntervalId(id);

		return () => clearInterval(id);
	}, []);

	useEffect(() => {
		if (!autoSlide) {
			clearInterval(intervalId);
		}
	}, [autoSlide]);

	return (
		<View style={{ overflow: 'hidden', flexDirection: 'row', ...style }}>
			<AnimatedView horizontal style={animatedStyle}>
				{renderArr.map((imageUri, idx) => (
					<Image key={idx} source={imageUri} style={styles.image} />
				))}
			</AnimatedView>
		</View>
	);
});

export default Carousel;

const styles = StyleSheet.create({
	image: {
		marginRight: 20,
		width: 200,
		height: 100,
		borderRadius: 10,
	},
});
