import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { type ModalConfigs, Text, View } from '@walless/gui';

const AddedLayoutAnnouncement: FC<{ config: ModalConfigs }> = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Added layout</Text>
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

export default AddedLayoutAnnouncement;
