import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
