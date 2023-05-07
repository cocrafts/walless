import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

const PasscodeInput = () => {
	return (
		<View style={styles.container}>
			<Text>PasscodeInput</Text>
		</View>
	);
};

export default PasscodeInput;

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 300,
		// backgroundColor: '#FFFFFF',
	},
});
