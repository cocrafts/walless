import type { FC } from 'react';
import { useRef, useState } from 'react';
import type { FlatList } from 'react-native-gesture-handler';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import type { CustomWalletAdvertisement } from '@walless/core';
import { View } from '@walless/gui';

import AdvertisementItem from './AdvertisementItem';

const IMAGE_SIZE = 266;

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

			if (event.translationX < -150) {
				animatedValue.value = currentIndex + 1;
				setCurrentIndex(currentIndex + 1);
			} else if (event.translationX > 150) {
				animatedValue.value = currentIndex - 1;
				setCurrentIndex(currentIndex - 1);
			}
		});

	return (
		<GestureDetector gesture={pan}>
			<View
				style={{
					flexDirection: 'row',
					minHeight: 200,
					minWidth: 200,
					paddingLeft: 40,
				}}
			>
				{/* <FlatList
					ref={scrollRef}
					data={ads}
					horizontal
					initialScrollIndex={0}
					showsVerticalScrollIndicator={false}
					snapToInterval={IMAGE_SIZE}
					renderItem={({ item, index }) => {
						return (
							<AdvertisementItem
								key={index}
								currentIndex={currentIndex}
								index={index}
								offsetX={offsetX}
								dataLength={ads.length}
								animatedValue={animatedValue}
								{...item}
							/>
						);
					}}
				/> */}
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
	);
};

export default Advertisement;
