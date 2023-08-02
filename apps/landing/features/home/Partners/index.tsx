import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ArrowRight } from '@walless/icons';
import SectionContainer from 'components/SectionContainer';

import Carousel from './Carousel';

export const Partners = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPrevDisable, setIsPrevDisable] = useState(false);
	const [isNextDisable, setIsNextDisable] = useState(false);
	const handleReachBounder = (isRightReach: boolean, isLeftReach: boolean) => {
		setIsPrevDisable(isLeftReach);
		setIsNextDisable(isRightReach);
	};

	return (
		<SectionContainer horizontal>
			<View>
				<Text style={styles.title}>Supporting partners</Text>
				<View style={styles.carouselControlContainer}>
					<Hoverable
						style={{
							...styles.outlineButton,
							...styles.leftArrow,
						}}
						onPress={() => setActiveIndex(activeIndex - 1)}
						disabled={isPrevDisable}
					>
						<ArrowRight />
					</Hoverable>
					<View style={styles.buttonSeparator} />
					<Hoverable
						style={styles.outlineButton}
						onPress={() => setActiveIndex(activeIndex + 1)}
						disabled={isNextDisable}
					>
						<ArrowRight />
					</Hoverable>
				</View>
			</View>
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
	title: {
		fontSize: 32,
		fontWeight: '500',
		color: '#ffffff',
	},
	carouselControlContainer: {
		flexDirection: 'row',
		marginTop: 30,
	},
	outlineButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		borderColor: '#ffffff',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	leftArrow: {
		transform: [{ rotate: '180deg' }],
	},
	buttonSeparator: {
		width: 30,
	},
	carouselContainer: {
		marginLeft: 30,
		flex: 1,
	},
});
