import { Platform } from 'react-native';
import { Buffer } from 'react-native-buffer';
import { shim } from 'react-native-quick-base64';
import { runtime } from '@walless/core';
import { BroadcastChannel } from 'broadcast-channel';

import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { TextDecoder, TextEncoder } from './encoder';

runtime.isBrowser = false;
runtime.isMobile = true;
runtime.isIOS = Platform.OS === 'ios';
runtime.isAndroid = Platform.OS === 'android';

class UniversalChannel extends BroadcastChannel {
	constructor(id: string) {
		super(id, { type: 'simulate', webWorkerSupport: false });
	}
}

global.Buffer = Buffer as never;
global.TextEncoder = TextEncoder as never;
global.TextDecoder = TextDecoder as never;
global.BroadcastChannel = UniversalChannel as never;

shim();

/* Avoid using node dependent modules */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
process.browser = true;
