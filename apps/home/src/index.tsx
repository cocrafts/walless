import { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
	container: {},
});

export const App: FC = () => {
	const val = useSharedValue(0);
	const [counter, setCounter] = useState(0);
	const helloStyle = useAnimatedStyle(() => {
		return {
			opacity: val.value,
		};
	});

	useEffect(() => {
		val.value = withTiming(1, { duration: 200 });
	}, []);

	return (
		<View style={styles.container}>
			<Text onPress={() => setCounter(counter + 1)}>
				this is home {counter}
			</Text>
			<Animated.View style={helloStyle}>
				<Text>Hello</Text>
			</Animated.View>
		</View>
	);
};

export default App;
