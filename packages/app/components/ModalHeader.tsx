import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { ModalConfigs } from '@walless/gui';
import { modalActions } from '@walless/gui';
import { Button } from '@walless/gui';
import { Text, View } from '@walless/gui';
import { Times } from '@walless/icons';

interface Props {
	content: string;
	config: ModalConfigs;
}

const ModalHeader: FC<Props> = ({ content, config }) => {
	const handlePressClose = () => {
		modalActions.destroy(config.id);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{content}</Text>
			<Button style={styles.button} onPress={handlePressClose}>
				<Times size={16} />
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
	},
});
