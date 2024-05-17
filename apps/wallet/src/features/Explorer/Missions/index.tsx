import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
	Directions,
	Gesture,
	GestureDetector,
} from 'react-native-gesture-handler';
import { View } from '@walless/gui';

import { missions } from '../internal';

import MissionItem from './MissionItem';

const Missions = () => {
	const [currentOffset, setCurrentOffset] = useState(0);
	const scrollRef = useRef<FlatList>(null);

	const leftFling = Gesture.Fling();
	const rightFling = Gesture.Fling();

	useEffect(() => {
		scrollRef.current?.scrollToOffset({
			offset: currentOffset,
			animated: true,
		});
	}, [currentOffset]);

	return (
		<View style={styles.container}>
			<GestureDetector
				gesture={leftFling.direction(Directions.LEFT).onFinalize((event) => {
					setCurrentOffset(currentOffset + event.x * 2);
				})}
			>
				<GestureDetector
					gesture={rightFling
						.direction(Directions.RIGHT)
						.onFinalize((event) => {
							setCurrentOffset(currentOffset - event.x * 2);
						})}
				>
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
								/>
							);
						}}
						horizontal
						showsVerticalScrollIndicator={false}
					/>
				</GestureDetector>
			</GestureDetector>
		</View>
	);
};

export default Missions;

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
		paddingLeft: 16,
	},
});
