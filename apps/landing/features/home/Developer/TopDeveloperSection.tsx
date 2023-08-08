import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

export const TopDeveloper: FC = () => {
	return (
		<View horizontal style={styles.container}>
			<Text style={[styles.text, styles.whiteText]}>For Developers</Text>
			<Text style={[styles.text, styles.blackText]}>We are open source!</Text>
		</View>
	);
};

export default TopDeveloper;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 100,
		backgroundColor: '#ffffff',
		alignItems: 'center',
	},
	text: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		fontWeight: '500',
		fontSize: 12,
	},
	whiteText: {
		backgroundColor: '#1995D1',
		borderRadius: 100,
		color: '#ffffff',
	},
	blackText: {
		color: '#000000',
	},
});
