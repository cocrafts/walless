import { useState } from 'react';
import { StyleSheet } from 'react-native';
import SectionContainer from 'components/SectionContainer';

import Carousel from './Carousel';
import TitleAndControl from './TitleAndControl';

export const Partners = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPrevDisable, setIsPrevDisable] = useState(false);
	const [isNextDisable, setIsNextDisable] = useState(false);

	const handleReachBounder = (isRightReach: boolean, isLeftReach: boolean) => {
		setIsPrevDisable(isLeftReach);
		setIsNextDisable(isRightReach);
	};

	const handleActiveIndexChange = (next: number) => {
		setActiveIndex(next);
	};

	return (
		<SectionContainer horizontal>
			<TitleAndControl
				activeIndex={activeIndex}
				isPrevDisable={isPrevDisable}
				isNextDisable={isNextDisable}
				handleActiveIndexChange={handleActiveIndexChange}
			/>
			<Carousel
				style={styles.carouselContainer}
				activeIndex={activeIndex}
				handleReachBounder={handleReachBounder}
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
