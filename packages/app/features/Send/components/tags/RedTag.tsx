import { type FC, type ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';

interface Props {
	title: string;
	prefix?: ReactNode;
}

export const RedTag: FC<Props> = ({ title, prefix }) => {
	return (
		<View style={styles.container}>
			{prefix}
			<Text style={styles.innerText}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
		alignItems: 'center',
		gap: 6,
		backgroundColor: '#2C1E1A',
	},
	innerText: {
		color: '#AE3939',
	},
});
