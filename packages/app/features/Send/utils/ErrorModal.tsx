import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { UnknownObject } from '@walless/core';
import { ModalConfigs, Text, View } from '@walless/gui';

interface Props {
	config: ModalConfigs;
}

export const ErrorModal: FC<Props> = ({ config }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>
				{(config as UnknownObject).context.errorText}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 400,
		backgroundColor: '#AE3939',
		paddingVertical: 20,
	},
	text: {
		fontSize: 14,
	},
});
