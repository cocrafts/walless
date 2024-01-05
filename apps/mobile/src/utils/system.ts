import type { FC } from 'react';
import { Keyboard, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { runtime } from '@walless/core';
import { showNotificationModal } from 'modals/Notification';

export const copy = async (value: string, prefix?: FC) => {
	if (runtime.isMobile) {
		Clipboard.setString(value);
	} else {
		await navigator.clipboard.writeText(value);
	}

	showNotificationModal({
		id: 'copy',
		prefix,
		message: 'Copied',
	});
};

export const hideNativeKeyboard = () => {
	if (Platform.OS !== 'web') {
		Keyboard.dismiss();
	}
};
