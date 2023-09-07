import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { UnknownObject } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';
import { Text, View } from '@walless/gui';

export const showError = async (errorText: string, timeout?: number) => {
	return new Promise((resolve) => {
		modalActions.show({
			id: 'error-modal',
			bindingDirection: BindDirections.InnerTop,
			component: ErrorModal,
			animateDirection: AnimateDirections.Bottom,
			withoutMask: true,
			context: {
				errorText: errorText,
			},
		});

		setTimeout(() => {
			modalActions.hide('error-modal');
			resolve(null);
		}, timeout || 1500);
	});
};

interface Props {
	config: ModalConfigs;
}

const ErrorModal: FC<Props> = ({ config }) => {
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
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#AE3939',
		padding: 20,
	},
	text: {
		fontSize: 14,
		textAlign: 'center',
	},
});
