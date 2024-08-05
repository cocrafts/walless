import type { FC } from 'react';
import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import type { FlatList } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import type { CustomWalletAdvertisement } from '@walless/core';
import { View } from '@walless/gui';

import AdvertisementIndicator from './AdvertisementIndicator';
import AdvertisementItem from './AdvertisementItem';

const CHANGE_POINT = 150;

interface Props {
	ads: CustomWalletAdvertisement[];
}

const Advertisement: FC<Props> = ({ ads }) => {
	const scrollOffset = useRef(0);
	const scrollRef = useRef<FlatList>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const animatedValue = useSharedValue(0);
	const offsetX = useSharedValue(0);

	const pan = Gesture.Pan()
		.onUpdate((event) => {
			scrollRef.current?.scrollToOffset({
				offset: scrollOffset.current - event.translationX,
				animated: false,
			});
			offsetX.value = event.translationX;
		})
		.onFinalize((event) => {
			offsetX.value = 0;

			if (currentIndex === 0 && event.translationX > 0) return;
			if (currentIndex === ads.length - 1 && event.translationX < 0) return;

			if (event.translationX < -CHANGE_POINT) {
				animatedValue.value = currentIndex + 1;
				setCurrentIndex(currentIndex + 1);
			} else if (event.translationX > CHANGE_POINT) {
				animatedValue.value = currentIndex - 1;
				setCurrentIndex(currentIndex - 1);
			}
		});

	return (
		<View style={styles.container}>
			<GestureDetector gesture={pan}>
				<View style={styles.itemsContainer}>
					{ads.map((item, index) => {
						return (
							<AdvertisementItem
								key={index}
								currentIndex={currentIndex}
								index={index}
								offsetX={offsetX}
								animatedValue={animatedValue}
								{...item}
							/>
						);
					})}
				</View>
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
		paddingHorizontal: 20,
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
