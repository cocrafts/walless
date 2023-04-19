import { shim } from 'react-native-quick-base64';

shim();

/* Avoid using node dependent modules */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
process.browser = true;
