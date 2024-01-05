import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { UnknownObject } from '@walless/core';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	Text,
	View,
} from '@walless/gui';

import { ModalId } from './internal';

interface Props {
	config: ModalConfigs;
}

export interface ErrorModalContext {
	errorText: string;
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

export const showError = (context: ErrorModalContext) => {
	modalActions.show({
		id: ModalId.Error,
		bindingDirection: BindDirections.InnerTop,
		component: ErrorModal,
		animateDirection: AnimateDirections.Bottom,
		withoutMask: true,
		context,
	});

	setTimeout(() => {
		modalActions.hide(ModalId.Error);
	}, 1000);
};
