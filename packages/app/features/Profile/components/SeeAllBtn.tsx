import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Hoverable, Text } from '@walless/gui';

interface Props {
	onPress: () => void;
}

const SeeAllBtn: FC<Props> = ({ onPress }) => {
	return (
		<Hoverable style={styles.button} onPress={onPress}>
			<Text style={styles.title}>See All</Text>
		</Hoverable>
	);
};

export default SeeAllBtn;

const styles = StyleSheet.create({
	button: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderWidth: 1,
		borderColor: '#56667433',
		borderRadius: 8,
	},
	title: {
		fontSize: 12,
		color: '#566674',
	},
});
