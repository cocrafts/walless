import { useRef } from 'react';
import { Image, StyleSheet } from 'react-native';
import type { CarouselItemRendererProps } from '@walless/gui';
import { Carousel } from '@walless/gui';
import SectionContainer from 'components/SectionContainer';

import TitleAndControl from './TitleAndControl';

export const Partners = () => {
	const carouselRef = useRef<{
		handleSlideLeftPress: () => void;
		handleSlideRightPress: () => void;
	}>();

	const handleLeftPress = () => {
		carouselRef.current?.handleSlideLeftPress();
	};

	const handleRightPress = () => {
		carouselRef.current?.handleSlideRightPress();
	};

	const renderCarouselItem = ({ item }: CarouselItemRendererProps) => {
		return (
			<Image source={{ uri: item.id }} style={{ width: 200, height: 140 }} />
		);
	};

	return (
		<SectionContainer horizontal>
			<TitleAndControl
				onLeftPress={handleLeftPress}
				onRightPress={handleRightPress}
			/>
			<Carousel
				itemSize={200}
				items={[
					{ id: '/img/home/partners/tezos.png' },
					{ id: '/img/home/partners/solana-university.png' },
				]}
				renderItem={renderCarouselItem}
			/>
		</SectionContainer>
	);
};

export default Partners;

const styles = StyleSheet.create({
	carouselContainer: {
		marginLeft: 30,
		flex: 1,
	},
});
