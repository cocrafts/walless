import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
	minScreen: {
		minHeight: '100vh',
	},
	container: {
		width: '100%',
		maxWidth: 1620,
		margin: 'auto',
	},
	contentContainer: {
		paddingTop: 40,
		maxWidth: 1024,
		margin: 'auto',
	},
});
