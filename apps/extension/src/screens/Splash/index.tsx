import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {},
});

export const SplashScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text>SplashScreen</Text>
		</View>
	);
};

export default SplashScreen;
