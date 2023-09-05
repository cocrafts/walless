import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const ProfileScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text>ProfileScreen</Text>
		</View>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
