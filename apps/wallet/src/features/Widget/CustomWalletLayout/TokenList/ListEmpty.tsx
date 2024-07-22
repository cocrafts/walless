import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

export const ListEmpty = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>You do not have any tokens yet.</Text>
		</View>
	);
};

export default ListEmpty;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingTop: 120,
	},
	text: {
		fontSize: 13,
		color: '#566674',
	},
});
