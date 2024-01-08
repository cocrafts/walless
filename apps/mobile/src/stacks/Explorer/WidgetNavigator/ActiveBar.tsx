import type { FC } from 'react';
import { useEffect } from 'react';
import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { AnimatedView } from '@walless/gui';

interface Props {
	width: number;
	height: number;
	fromHeight: number;
}

export const ActiveBar: FC<Props> = ({ width, height, fromHeight }) => {
	const innerHeight = height - width * 2;
	const shared = useSharedValue(fromHeight);

	const style = useAnimatedStyle(
		() => ({
			position: 'absolute',
			top: 0,
			left: 0,
			width,
			height: shared.value,
			backgroundColor: 'white',
			borderTopRightRadius: width,
			borderBottomRightRadius: width,
			transform: [{ translateY: height / 2 - shared.value / 2 }],
		}),
		[shared],
	);

	useEffect(() => {
		shared.value = withSpring(innerHeight, { damping: 10 });
	}, []);

	return <AnimatedView style={style} />;
};

export default ActiveBar;
