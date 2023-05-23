import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

const index = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Hello tan</Text>
		</View>
	);
};

export default index;

const styles = StyleSheet.create({
	container: {
		minHeight: '100vh',
		minWidth: '100wh',
		backgroundColor: '#ccc',
		justifyContent: 'center',
		alignItems: 'center',
	},
	h1: {
		fontSize: 20,
	},
});
