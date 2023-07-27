import type { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { modalActions, Text, View } from '@walless/gui';
import { Times } from '@walless/icons';

export const ErrorAnnouncement: FC<{ content: string }> = ({ content }) => {
	const handleExit = () => {
		modalActions.hide('error-announcement');
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.exitButton} onPress={handleExit}>
				<Times size={16} />
			</TouchableOpacity>
			<Text style={styles.text}>{content}</Text>
		</View>
	);
};

export default ErrorAnnouncement;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 400,
		height: 60,
		backgroundColor: '#AE3939',
	},
	exitButton: {
		position: 'absolute',
		top: 8,
		right: 8,
	},
	text: {
		marginHorizontal: 60,
		textAlign: 'center',
	},
});
