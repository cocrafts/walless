import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';

const CopiedNotification = () => {
	return (
		<View horizontal style={styles.container}>
			<Copy size={24} color="#FFFFFF" />
			<Text style={styles.title}>Copied</Text>
		</View>
	);
};

export default CopiedNotification;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 160,
		height: 60,
		backgroundColor: '#43525F',
		borderRadius: 60,
		gap: 8,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
	},
});
