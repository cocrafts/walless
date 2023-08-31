import { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import SectionContainer from 'components/SectionContainer';

import { sharedStyles } from '../shared';

import Carousel from './Carousel';
import CarouselControl from './CarouselControl';

const SMALL_SCREEN_THRESHOLD = 648;

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

	const [smallScreen, setSmallScreen] = useState(false);

	return (
		<SectionContainer
			horizontal={!smallScreen}
			style={[styles.container, styles.sharedGap]}
			onLayout={({
				nativeEvent: {
					layout: { width },
				},
			}) => setSmallScreen(width < SMALL_SCREEN_THRESHOLD)}
		>
			<View style={[styles.sharedGap, smallScreen && styles.smallContainer]}>
				<Text style={sharedStyles.title}>Supporting partners</Text>
				{!smallScreen && (
					<CarouselControl
						handleLeftPress={handleLeftPress}
						handleRightPress={handleRightPress}
					/>
				)}
			</View>

			<Carousel ref={carouselRef} style={styles.carouselContainer} />

			{smallScreen && (
				<View style={styles.smallContainer}>
					<CarouselControl
						handleLeftPress={handleLeftPress}
						handleRightPress={handleRightPress}
					/>
				</View>
			)}
		</SectionContainer>
	);
};

export default Partners;

const styles = StyleSheet.create({
	sharedGap: {
		gap: 30,
	},
	container: {
		minWidth: 320,
	},
	smallContainer: {
		alignItems: 'center',
	},
	carouselContainer: {
		maxWidth: '100%',
		flex: 1,
		borderRadius: 10,
	},
});
