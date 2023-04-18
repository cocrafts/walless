import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {}

export const Stack: FC = () => {
	return (
		<View style={styles.container}>
			<Text>Stack</Text>
		</View>
	);
};

export default Stack;

const styles = StyleSheet.create({
	container: {},
});
