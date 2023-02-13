import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const App: FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>COMING SOON!</Text>
			<Text>
				<Text style={styles.sub}>Created with ❤️ by Metacraft</Text>
			</Text>
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#001825',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heading: {
		color: '#ffffff',
		fontSize: 42,
		marginBottom: 8,
	},
	sub: {
		color: '#888888',
	},
});
