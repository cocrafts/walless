import { StyleSheet } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { Button, Text, View } from '@walless/gui';

const AnimatedBox = Animated.createAnimatedComponent(View);

const IndexPage = () => {
	const size = useSharedValue(1);

	const boxStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: size.value,
				},
			],
		};
	}, [size]);

	const handlePress = () => {
		if (size.value < 1) size.value = withSpring(size.value * 1.5);
		else size.value = withSpring(size.value * 0.5);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Hello tan</Text>
			<AnimatedBox style={[styles.animatedBox, boxStyle]} />
			<Button onPress={() => handlePress()} title={'Click me!'} />
		</View>
	);
};

export default IndexPage;

const styles = StyleSheet.create({
	container: {
		minHeight: '100vh',
		minWidth: '100wh',
		backgroundColor: '#ccc',
		justifyContent: 'center',
		alignItems: 'center',
	},
	animatedBox: {
		width: 100,
		height: 100,
		backgroundColor: 'blue',
	},
	h1: {
		fontSize: 20,
		color: 'black',
	},
});
