import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';

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
