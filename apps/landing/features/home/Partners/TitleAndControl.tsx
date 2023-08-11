import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ArrowRight } from '@walless/icons';

interface Props {
	onRightPress: () => void;
	onLeftPress: () => void;
}

export const TitleAndControl: FC<Props> = ({ onRightPress, onLeftPress }) => {
	return (
		<View>
			<Text style={styles.title}>Supporting partners</Text>
			<View style={styles.carouselControlContainer}>
				<Hoverable
					style={{
						...styles.outlineButton,
						...styles.leftArrow,
					}}
					onPress={onLeftPress}
				>
					<ArrowRight />
				</Hoverable>
				<View style={styles.buttonSeparator} />
				<Hoverable style={styles.outlineButton} onPress={onRightPress}>
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
		flexDirection: 'row',
		marginTop: 30,
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
	leftArrow: {
		transform: [{ rotate: '180deg' }],
	},
	buttonSeparator: {
		width: 15,
	},
});
