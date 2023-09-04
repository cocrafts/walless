import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const SettingScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text>SettingScreen</Text>
		</View>
	);
};

export default SettingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
