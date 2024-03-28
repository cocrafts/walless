import { ActivityIndicator, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

export const Processing = () => {
	return (
		<View style={styles.container}>
			<ActivityIndicator />
			<Text>Processing...</Text>
		</View>
	);
};

export default Processing;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 6,
	},
});
