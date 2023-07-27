import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { ModalConfigs } from '@walless/gui';
import { Text, View } from '@walless/gui';

const HoverAnnouncement: FC<{ config: ModalConfigs }> = ({ config }) => {
	const { title } = config.context as { title: string };
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#43525F',
		width: 108,
		height: 36,
		borderRadius: 8,
	},
	text: {
		color: '#FFFFFF',
		fontSize: 14,
		fontWeight: '400',
	},
});

export default HoverAnnouncement;
