import { Buffer } from 'react-native-buffer';
import { shim } from 'react-native-quick-base64';
import { runtime } from '@walless/core';

import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import { TextDecoder, TextEncoder } from './encoder';
import { Platform } from 'react-native';

runtime.isBrowser = false;
runtime.isMobile = true;
runtime.isIOS = Platform.OS === 'ios';
runtime.isAndroid = Platform.OS === 'android';

global.Buffer = Buffer as never;
global.TextEncoder = TextEncoder as never;
global.TextDecoder = TextDecoder as never;
shim();

/* Avoid using node dependent modules */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
process.browser = true;
