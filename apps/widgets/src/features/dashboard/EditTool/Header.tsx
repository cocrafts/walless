import { StyleSheet } from 'react-native';
import { Text } from '@walless/gui';

const Header = () => {
	return (
		<Text style={styles.mainText}>
			Design tool - Preview
			{/* - <Text style={styles.highlightedText}>Walless</Text> */}
		</Text>
	);
};

export default Header;

const styles = StyleSheet.create({
	mainText: {
		fontSize: 30,
		maxWidth: 600,
		color: '#ffffff',
	},
	highlightedText: {
		color: '#0694D3',
	},
});
