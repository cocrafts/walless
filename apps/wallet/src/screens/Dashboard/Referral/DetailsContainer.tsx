import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	title: string;
	value: string;
}

const DetailsContainer: FC<Props> = ({ title, value }) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>{title}</Text>
			<Text style={[styles.text]}>{value}</Text>
		</View>
	);
};

export default DetailsContainer;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#566674',
		gap: 12,
		padding: 12,
	},
	title: {
		fontWeight: '500',
	},
	text: {
		fontSize: 12,
		color: '#ffffff',
	},
});
