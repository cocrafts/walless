import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import SectionContainer from 'components/SectionContainer';

import Carousel from './Carousel';
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

	return (
		<SectionContainer horizontal>
			<TitleAndControl
				handleLeftPress={handleLeftPress}
				handleRightPress={handleRightPress}
			/>
			<Carousel ref={carouselRef} style={styles.carouselContainer} />
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
