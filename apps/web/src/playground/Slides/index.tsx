import { type FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Slider, View } from '@walless/gui';

import { slides } from './shared';

export const Slides: FC = () => {
	const [index, setIndex] = useState<number>(0);

	const handleNext = () => {
		setIndex(index + 1);
	};

	const handlePrevious = () => {
		setIndex(index - 1);
	};

	return (
		<View style={styles.container}>
			<Slider
				style={styles.container}
				items={slides}
				activeItem={slides[index]}
			/>
			<View style={styles.navigationContainer}>
				<Button style={styles.button} title="<" onPress={handlePrevious} />
				<Button style={styles.button} title=">" onPress={handleNext} />
			</View>
		</View>
	);
};

export default Slides;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	slideContainer: {
		flex: 1,
	},
	navigationContainer: {
		flexDirection: 'row',
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		paddingVertical: 8,
		paddingHorizontal: 4,
		justifyContent: 'center',
	},
	button: {
		marginHorizontal: 4,
	},
});
