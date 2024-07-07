import type { FC } from 'react';
import { useRef } from 'react';
import type { ViewStyle } from 'react-native';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { View } from '@walless/gui';

import { missions } from '../internal';

import MissionItem from './MissionItem';

interface Props {
	style?: ViewStyle;
}

const Missions: FC<Props> = ({ style }) => {
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
			<View
				style={[
					styles.container,
					Platform.OS === 'web' && styles.webContainer,
					style,
				]}
			>
				<FlatList
					ref={scrollRef}
					data={missions}
					initialScrollIndex={0}
					renderItem={({ item, index }) => {
						return (
							<MissionItem
								title={item.title}
								buttonText={item.buttonText}
								onPress={item.onPress}
								url={item.url}
								style={
									index === missions.length - 1
										? styles.lastMissionContainer
										: {}
								}
							/>
						);
					}}
					horizontal
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ gap: 8 }}
				/>
			</View>
		</GestureDetector>
	);
};

export default Missions;

const styles = StyleSheet.create({
	container: {},
	webContainer: {
		cursor: 'pointer',
	} as never,
	lastMissionContainer: {
		marginRight: 16,
	},
});
