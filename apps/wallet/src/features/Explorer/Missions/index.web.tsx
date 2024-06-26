import { useRef } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

import { missions } from '../internal';

import MissionItem from './MissionItem';

const MAX_TRANSLATE_X = missions.length * 130;
const springProps = {
	damping: 100,
	mass: 2,
};

const Missions = () => {
	const width = useSharedValue(0);
	const scrollOffset = useSharedValue(16);
	const ref = useRef(null);

	const panGesture = Gesture.Pan()
		.onUpdate((event) => {
			scrollOffset.value = withSpring(
				scrollOffset.value + event.translationX,
				springProps,
			);
		})
		.onFinalize((event) => {
			console.log('event.translationX', event.translationX);

			if (event.translationX + scrollOffset.value >= 20) {
				scrollOffset.value = withSpring(20, springProps);
			} else if (
				event.translationX + scrollOffset.value <=
				-(MAX_TRANSLATE_X - (width.value - 20))
			) {
				console.log(
					'this is the limit of the end: ',
					MAX_TRANSLATE_X - (width.value - 20),
				);
				scrollOffset.value = withSpring(
					-(MAX_TRANSLATE_X - (width.value - 20)),
					springProps,
				);
				return;
			} else
				scrollOffset.value = withSpring(
					scrollOffset.value + event.translationX,
					springProps,
				);
		});

	const animatedStyle = useAnimatedStyle(() => {
		return {};
	}, [scrollOffset]);

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View
				ref={ref}
				style={[{ flexDirection: 'row', height: 110 }, animatedStyle]}
				onLayout={(event) => {
					width.value = event.nativeEvent.layout.width;
				}}
			>
				{missions.map((item, index) => {
					let colors = ['#EC74A2', '#F4B999'];
					if (index % 3 === 1) {
						colors = ['#8253FF', '#D73EFF'];
					} else if (index % 3 === 2) {
						colors = ['#3263FF', '#45CFFF'];
					}

					return (
						<MissionItem
							key={index}
							index={index}
							scrollOffset={scrollOffset}
							id={index.toString()}
							title={item.title}
							colors={colors}
							buttonText={item.buttonText}
							onPress={item.onPress}
							url={item.url}
						/>
					);
				})}
			</Animated.View>
		</GestureDetector>
	);
};

export default Missions;
