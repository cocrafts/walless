import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@walless/gui';
import { ChevronRight } from '@walless/icons';
import { router } from 'utils/routing';

const Title = () => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.navigate('/profile')}
			>
				<ChevronRight size={18} />
			</TouchableOpacity>

			<Text style={styles.text}>Settings</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 16,
	},
	button: {
		width: 24,
		height: 24,
		padding: 0,
		borderRadius: 100,
		backgroundColor: '#25313D',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
		color: 'white',
	},
});

export default Title;
