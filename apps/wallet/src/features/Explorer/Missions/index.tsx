import { useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { View } from '@walless/gui';

import { missions } from '../internal';

import MissionItem from './MissionItem';

const Missions = () => {
	const scrollOffset = useRef(0);
	const scrollRef = useRef<FlatList>(null);

	// another solution https://gist.github.com/nandorojo/92e7301a49a8b9575bb24b3b1ddc19bf
	// fixing web horizontal scroll by mouse, might not work on mobile
	const pan = Gesture.Pan()
		.onUpdate((event) => {
			scrollRef.current?.scrollToOffset({
				offset: scrollOffset.current - event.translationX,
				animated: false,
			});
		})
		.onFinalize((event) => {
			// snapshot offset
			scrollOffset.current = scrollOffset.current - event.translationX;
		});

	return (
		<GestureDetector gesture={pan}>
			<View style={styles.container}>
				<FlatList
					ref={scrollRef}
					data={missions}
					initialScrollIndex={0}
					renderItem={({ item, index }) => {
						let colors = ['#EC74A2', '#F4B999'];
						if (index % 3 === 1) {
							colors = ['#8253FF', '#D73EFF'];
						} else if (index % 3 === 2) {
							colors = ['#3263FF', '#45CFFF'];
						}

						return (
							<MissionItem
								id={index.toString()}
								title={item.title}
								colors={colors}
								buttonText={item.buttonText}
								onPress={item.onPress}
								url={item.url}
							/>
						);
					}}
					horizontal
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</GestureDetector>
	);
};

export default Missions;

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
		paddingLeft: 16,
		cursor: 'pointer',
	},
});
