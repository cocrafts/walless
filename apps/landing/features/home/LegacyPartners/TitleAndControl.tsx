import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ArrowRight } from '@walless/icons';

interface Props {
	handleLeftPress: () => void;
	handleRightPress: () => void;
}

export const TitleAndControl: FC<Props> = ({
	handleLeftPress,
	handleRightPress,
}) => {
	return (
		<View>
			<Text style={styles.title}>Supporting partners</Text>
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
		</View>
	);
};

export default TitleAndControl;

const styles = StyleSheet.create({
	title: {
		fontSize: 32,
		fontWeight: '500',
		color: '#ffffff',
	},
	carouselControlContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
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
