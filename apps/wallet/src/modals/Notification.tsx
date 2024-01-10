import type { FC } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ModalConfigs } from '@walless/gui';
import { BindDirections, modalActions, Text } from '@walless/gui';
import { Copy } from '@walless/icons';

import { ModalId } from './internal';

export interface NotificationModalContext {
	id: string;
	message: string;
	textStyle?: StyleProp<TextStyle>;
	prefix?: FC;
	suffix?: FC;
	timeout?: number;
}

interface Props {
	config: ModalConfigs;
}

const NotificationModal: FC<Props> = ({ config }) => {
	const insets = useSafeAreaInsets();
	const {
		message,
		textStyle,
		prefix: PrefixComponent,
		suffix: SuffixComponent,
	} = config.context as NotificationModalContext;
	const containerStyle: ViewStyle = {
		marginTop: insets.top,
	};

	return (
		<View style={[styles.container, containerStyle]}>
			{PrefixComponent && <PrefixComponent />}
			<Text style={textStyle}>{message}</Text>
			{SuffixComponent && <SuffixComponent />}
		</View>
	);
};

export const showNotificationModal = (context: NotificationModalContext) => {
	const id = `${ModalId.Notification}-${context.id}}`;

	modalActions.show({
		id,
		component: NotificationModal,
		fullWidth: false,
		withoutMask: true,
		bindingDirection: BindDirections.InnerTop,
		positionOffset: { y: 16 },
		context,
	});

	context.timeout && setTimeout(() => modalActions.hide(id), context.timeout);
};

export const showCopiedModal = () => {
	showNotificationModal({
		id: 'copy',
		message: 'Copied',
		timeout: 2000,
		prefix: () => <Copy size={18} color="#FFFFFF" />,
	});
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#43525F',
		borderRadius: 60,
		paddingVertical: 16,
		paddingHorizontal: 20,
		gap: 8,
	},
});
