import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

export const EmptyTab: FC = () => {
	return (
		<View>
			<Text style={styles.text}>Not available yet</Text>
		</View>
	);
};

export default EmptyTab;

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
		color: '#566674',
		fontSize: 13,
		marginTop: 120,
	},
});
