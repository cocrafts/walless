import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { UnknownObject } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import { Text, View } from '@walless/gui';
import { AnimateDirections, BindDirections, modalActions } from '@walless/gui';

interface Props {
	config: ModalConfigs;
}

const ErrorModal: FC<Props> = ({ config }) => {
	const insets = useSafeAreaInsets();
	const containerStyle: ViewStyle = {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#AE3939',
		paddingTop: Math.max(insets.top, 20),
		paddingBottom: 20,
	};

	return (
		<View style={containerStyle}>
			<Text>{(config as UnknownObject).context.errorText}</Text>
		</View>
	);
};

export const showError = (errorText: string) => {
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
	}, 1000);
};
