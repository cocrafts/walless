import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, View } from '@walless/gui';
import { ArrowRight } from '@walless/icons';

interface Props {
	handleLeftPress: () => void;
	handleRightPress: () => void;
}

export const CarouselControl: FC<Props> = ({
	handleLeftPress,
	handleRightPress,
}) => {
	return (
		<View style={styles.carouselControlContainer}>
			<Hoverable
				style={{
					...styles.outlineButton,
					...styles.leftArrow,
				}}
				onPress={handleLeftPress}
			>
				<ArrowRight />
			</Hoverable>
			<View style={styles.buttonSeparator} />
			<Hoverable style={styles.outlineButton} onPress={handleRightPress}>
				<ArrowRight />
			</Hoverable>
		</View>
	);
};

export default CarouselControl;

const styles = StyleSheet.create({
	carouselControlContainer: {
		flexDirection: 'row',
	},
	outlineButton: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderColor: '#ffffff',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	disabledButton: {
		opacity: 0.5,
	},
	leftArrow: {
		transform: [{ rotate: '180deg' }],
	},
	buttonSeparator: {
		width: 15,
	},
});
