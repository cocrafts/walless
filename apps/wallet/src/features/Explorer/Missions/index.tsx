import {
	NativeScrollEvent,
	NativeSyntheticEvent,
	StyleSheet,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	scrollTo,
	set,
	useAnimatedRef,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	useWorklets,
	withSpring,
} from 'react-native-reanimated';

import { missions } from '../internal';

import MissionItem from './MissionItem';

const Missions = () => {
	const scrollOffset = useSharedValue(0);
	const scrollRef = useAnimatedRef<Animated.ScrollView>();

	const scrollPanGesture = Gesture.Pan()
		.onUpdate((event) => {
			console.log('event', event.translationX);
			scrollOffset.value += event.translationX;
		})
		.onFinalize((event) => {
			handleScrollTo(event.translationX);
		});

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		scrollOffset.value = event.nativeEvent.contentOffset.x;
	};

	useDerivedValue(() => Math.max(0, scrollOffset.value));

	const handleScrollTo = (targetPosition: number) => {
		scrollTo(scrollRef, targetPosition, 0, true);
	};

	const scrollAnimatedStyle = useAnimatedStyle(
		() => ({
			transform: [{ translateX: scrollOffset.value }],
		}),
		[scrollOffset],
	);

	return (
		<GestureDetector gesture={scrollPanGesture}>
			<Animated.ScrollView
				ref={scrollRef}
				style={[styles.container]}
				onScroll={handleScroll}
				horizontal
				showsHorizontalScrollIndicator={false}
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
							id={index.toString()}
							title={item.title}
							colors={colors}
						/>
					);
				})}
			</Animated.ScrollView>
		</GestureDetector>
	);
};

export default Missions;

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
		paddingLeft: 16,
	},
});
