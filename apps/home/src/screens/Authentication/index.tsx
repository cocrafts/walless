import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {},
});

export const AuthenticationScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text>AuthenticationScreen</Text>
		</View>
	);
};

export default AuthenticationScreen;
