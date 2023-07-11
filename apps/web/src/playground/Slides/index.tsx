import type { FC } from 'react';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import type { SliderHandle } from '@walless/gui';
import { Button, slideAnimators, Slider, View } from '@walless/gui';

import { slides } from './shared';

export const Slides: FC = () => {
	const sliderRef = useRef<SliderHandle>(null);

	return (
		<View style={styles.container}>
			<Slider
				ref={sliderRef}
				style={styles.container}
				items={slides}
				activeItem={slides[0]}
				animator={slideAnimators.fade}
			/>
			<View style={styles.navigationContainer}>
				<Button
					style={styles.button}
					title="<"
					onPress={() => sliderRef.current?.slideBack()}
				/>
				<Button
					style={styles.button}
					title=">"
					onPress={() => sliderRef.current?.slideNext()}
				/>
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
