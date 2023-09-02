import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

export const DashboardScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Dashboard</Text>
		</View>
	);
};

export default DashboardScreen;

const styles = StyleSheet.create({
	container: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 50,
		fontWeight: '500',
	},
});
