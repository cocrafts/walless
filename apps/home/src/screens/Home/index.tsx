import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';

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
