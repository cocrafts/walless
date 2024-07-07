import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@walless/gui';

export const ContactScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text>ContactScreen</Text>
		</View>
	);
};

export default ContactScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
