import type { FC } from 'react';
import { useRef, useState } from 'react';
import type { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import type { CustomWalletAdvertisement } from '@walless/core';
import { View } from '@walless/gui';

import AdvertisementIndicator from './AdvertisementIndicator';
import AdvertisementItem from './AdvertisementItem';

const IMAGE_SIZE = 266;
const CHANGE_POINT = 150;

interface Props {
	ads: CustomWalletAdvertisement[];
}

const Advertisement: FC<Props> = ({ ads }) => {
	const scrollOffset = useRef(0);
	const scrollRef = useRef<FlatList>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const pan = Gesture.Pan()
		.onUpdate((event) => {
			const offset = scrollOffset.current - event.translationX;
			if (currentIndex === 0 && event.translationX > 0) return;
			if (currentIndex === ads.length - 1 && event.translationX < 0) return;

			scrollRef.current?.scrollToOffset({
				offset,
				animated: false,
			});
		})
		.onFinalize((event) => {
			if (currentIndex === 0 && event.translationX > 0) {
				scrollOffset.current = 0;
				return;
			}
			if (currentIndex === ads.length - 1 && event.translationX < 0) {
				scrollOffset.current = IMAGE_SIZE * currentIndex;
				return;
			}

			let nextIndex = 0;

			if (event.translationX < -CHANGE_POINT) {
				nextIndex = 1;
			} else if (event.translationX > CHANGE_POINT) {
				nextIndex = -1;
			}

			setCurrentIndex(currentIndex + nextIndex);
			scrollRef.current?.scrollToIndex({
				index: currentIndex + nextIndex,
				animated: false,
			});
			scrollOffset.current = IMAGE_SIZE * currentIndex;
		});

	return (
		<View style={styles.container}>
			<GestureDetector gesture={pan}>
				<Animated.FlatList
					ref={scrollRef}
					data={ads}
					contentContainerStyle={styles.flatlist}
					initialScrollIndex={0}
					horizontal
					scrollEventThrottle={16}
					snapToInterval={8}
					showsVerticalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<AdvertisementItem key={index} {...item} />
					)}
				/>
			</GestureDetector>
			<View style={styles.indicatorContainer}>
				{ads.map((_, index) => (
					<AdvertisementIndicator
						key={index}
						currentIndex={currentIndex}
						index={index}
					/>
				))}
			</View>
		</View>
	);
};

export default Advertisement;

const styles = StyleSheet.create({
	container: {
		gap: 8,
		paddingHorizontal: 0,
	},
	flatlist: {
		marginHorizontal: 12,
		gap: 12,
	},
	itemsContainer: {
		flexDirection: 'row',
		minHeight: 164,
		minWidth: 200,
	},
	indicatorContainer: {
		flexDirection: 'row',
		gap: 4,
		alignSelf: 'center',
	},
});
