import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from '@walless/gui';

interface Props {
	name: string;
	isActive: boolean;
	onPress: () => void;
}

const ToolName: FC<Props> = ({ name, isActive, onPress }) => {
	const color = isActive ? 'white' : '#566674';

	return (
		<Button style={styles.button} onPress={onPress}>
			<Text style={{ ...styles.text, color }}>{name}</Text>
		</Button>
	);
};

export default ToolName;

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'transparent',
	},
	text: {
		fontWeight: '500',
	},
});
