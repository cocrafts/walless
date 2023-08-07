import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { ArrowRight } from '@walless/icons';

interface Props {
	activeIndex: number;
	isPrevDisable: boolean;
	isNextDisable: boolean;
	handleActiveIndexChange: (next: number) => void;
}

export const TitleAndControl: FC<Props> = ({
	activeIndex,
	isPrevDisable,
	isNextDisable,
	handleActiveIndexChange,
}) => {
	return (
		<View>
			<Text style={styles.title}>Supporting partners</Text>
			<View style={styles.carouselControlContainer}>
				<View style={isPrevDisable && styles.disabledButton}>
					<Hoverable
						style={{
							...styles.outlineButton,
							...styles.leftArrow,
						}}
						onPress={() => handleActiveIndexChange(activeIndex - 1)}
						disabled={isPrevDisable}
					>
						<ArrowRight />
					</Hoverable>
				</View>
				<View style={styles.buttonSeparator} />
				<View style={isNextDisable && styles.disabledButton}>
					<Hoverable
						style={styles.outlineButton}
						onPress={() => handleActiveIndexChange(activeIndex + 1)}
						disabled={isNextDisable}
					>
						<ArrowRight />
					</Hoverable>
				</View>
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
