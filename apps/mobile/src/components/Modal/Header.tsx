import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@walless/gui';
import { Text, View } from '@walless/gui';
import { Times } from '@walless/icons';

interface Props {
	content: string;
	onPressClose: () => void;
}

const ModalHeader: FC<Props> = ({ content, onPressClose }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{content}</Text>
			<Button style={styles.button} onPress={onPressClose}>
				<Times size={20} />
			</Button>
		</View>
	);
};

export default ModalHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	title: {
		color: '#FFFFFF',
		fontWeight: '500',
		fontSize: 20,
	},
	button: {
		backgroundColor: 'transparent',
		paddingHorizontal: 0,
	},
});
