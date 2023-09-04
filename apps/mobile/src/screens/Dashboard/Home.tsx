import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const DashboardHomeScreen: FC = () => {
	return (
		<View style={styles.container}>
			<Text>DashboardHomeScreen</Text>
		</View>
	);
};

export default DashboardHomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
