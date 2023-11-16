import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { Copy } from '@walless/icons';

const CopiedAnnouncement = () => {
	return (
		<View style={styles.container}>
			<Copy size={24} color="#FFFFFF" />
			<Text style={styles.text}>Copied</Text>
		</View>
	);
};

export default CopiedAnnouncement;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 160,
		height: 60,
		backgroundColor: '#43525F',
		borderRadius: 100,
		gap: 8,
	},
	text: {
		fontWeight: '500',
		fontSize: 16,
	},
});
