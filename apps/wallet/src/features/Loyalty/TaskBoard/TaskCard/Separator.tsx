import { StyleSheet, View } from 'react-native';

const Separator = () => {
	return <View style={styles.separator} />;
};

export default Separator;

const styles = StyleSheet.create({
	separator: {
		height: 1,
		backgroundColor: '#19232C',
	},
});
