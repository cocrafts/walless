import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@walless/gui';

interface Props {
	text: string;
	color?: string;
	backgroundColor?: string;
}

const Tag: FC<Props> = ({
	text,
	color = 'white',
	backgroundColor = '#19232C',
}) => {
	return (
		<View style={[styles.container, { backgroundColor }]}>
			<Text style={[styles.text, { color }]}>{text}</Text>
		</View>
	);
};

export default Tag;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 48,
	},
	text: {
		fontSize: 12,
	},
});
