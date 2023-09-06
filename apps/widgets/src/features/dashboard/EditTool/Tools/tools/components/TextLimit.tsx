import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '@walless/gui';

interface Props {
	current: number;
	limit: number;
}

const TextLimit: FC<Props> = ({ current, limit }) => {
	return (
		<Text style={styles.text}>
			{current} / {limit}
		</Text>
	);
};

export default TextLimit;

const styles = StyleSheet.create({
	text: {
		color: '#566674',
		fontSize: 13,
	},
});
