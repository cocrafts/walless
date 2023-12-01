import type { FC } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { runtime } from '@walless/core';

import { notify } from './modal';

export const copy = async (value: string, prefix?: FC) => {
	if (runtime.isMobile) {
		Clipboard.setString(value);
	} else {
		await navigator.clipboard.writeText(value);
	}

	notify('copied', {
		prefix,
		message: 'Copied',
	});
};
