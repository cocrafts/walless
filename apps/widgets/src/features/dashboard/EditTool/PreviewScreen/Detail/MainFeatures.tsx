import { StyleSheet } from 'react-native';
import { Button, Text, View } from '@walless/gui';
import { ArrowBottomRight, ArrowTopRight } from '@walless/icons';

const MainFeatures = () => {
	return (
		<View horizontal style={styles.container}>
			<View style={styles.buttonContainer}>
				<Button style={styles.button}>
					<ArrowTopRight size={18} />
				</Button>
				<Text style={styles.text}>Send</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Button style={styles.button}>
					<ArrowBottomRight size={18} />
				</Button>
				<Text style={styles.text}>Receive</Text>
			</View>
		</View>
	);
};

export default MainFeatures;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		gap: 20,
	},
	buttonContainer: {
		alignItems: 'center',
		gap: 4,
	},
	button: {
		width: 38,
		height: 38,
		borderRadius: 12,
	},
	text: {
		fontSize: 13,
		color: '#4e5e6b',
	},
});
