import { StyleSheet } from 'react-native';
import { Text } from '@walless/gui';

const Header = () => {
	return (
		<Text style={styles.mainText}>
			Design tool - <Text style={styles.highlightedText}>Walless</Text>
		</Text>
	);
};

export default Header;

const styles = StyleSheet.create({
	mainText: {
		alignSelf: 'center',
		fontSize: 30,
		maxWidth: 600,
		textAlign: 'center',
		marginBottom: 40,
	},
	highlightedText: {
		color: '#0694D3',
	},
});
