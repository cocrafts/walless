import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {},
});

export const HomeScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text>HomeScreen</Text>
		</View>
	);
};

export default HomeScreen;
