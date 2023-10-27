import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';

export const Delimiter = () => {
	return <View style={styles.delimiter}></View>;
};

export default Delimiter;

const styles = StyleSheet.create({
	delimiter: {
		flexGrow: 1,
		height: 1,
		backgroundColor: '#56667466',
		marginTop: 10,
		marginBottom: 14,
	},
});
