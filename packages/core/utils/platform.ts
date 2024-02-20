import { type UniversalRuntime } from './common';

const userAgent = global.navigator?.userAgent?.toLowerCase() || 'server';
const isOpera = userAgent.indexOf(' OPR/') !== -1;
const isFirefox = userAgent.indexOf('firefox') !== -1;
const isChrome =
	!!global.chrome && (!!global.chrome.webstore || !!global.chrome.runtime);
const isEdgeChromium = isChrome && global.navigator?.userAgent?.indexOf('Edg') != -1;
const isBlink = (isChrome || isOpera) && !!global.CSS;

const browser: any = isFirefox ? (global as any).browser : global.chrome;
const isExtension = !!global.chrome?.runtime;
const isServer = !isExtension && typeof window === 'undefined';

export const runtime: UniversalRuntime = {
	isOpera,
	isFirefox,
	isChrome,
	isEdgeChromium,
	isBlink,
	isExtension,
	isServer,
	isBrowser: !isExtension && !isServer,
	isMobile: false,
	isIOS: false,
	isAndroid: false,
	onConnect: browser?.runtime?.onConnect,
	onMessage: browser?.runtime?.onMessage,
	connect: browser?.runtime?.connect,
};
