import { Keyboard, Platform } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { runtime } from '@walless/core';

export const copy = async (value: string) => {
	if (runtime.isMobile) {
		Clipboard.setString(value);
	} else {
		await navigator.clipboard.writeText(value);
	}
};

export const hideNativeKeyboard = () => {
	if (Platform.OS !== 'web') {
		Keyboard.dismiss();
	}
};
