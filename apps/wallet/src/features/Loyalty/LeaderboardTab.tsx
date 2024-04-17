import { StyleSheet, Text, View } from 'react-native';

const LeaderboardTab = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Coming soon!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 20,
		color: 'white',
	},
});

export default LeaderboardTab;
