import { UniversalRuntime } from './types';

const isOpera =
	(!!global.opr && !!opr.addons) ||
	!!global.opera ||
	navigator.userAgent.indexOf(' OPR/') >= 0;

const isFirefox = typeof InstallTrigger !== 'undefined';
const isSafari =
	/constructor/i.test(global.HTMLElement) ||
	(function (p) {
		return p.toString() === '[object SafariRemoteNotification]';
	})(
		!global.safari ||
			(typeof safari !== 'undefined' && global.safari.pushNotification),
	);
const isChrome =
	!!global.chrome && (!!global.chrome.webstore || !!global.chrome.runtime);
const isEdgeChromium = isChrome && navigator.userAgent.indexOf('Edg') != -1;
const isBlink = (isChrome || isOpera) && !!global.CSS;

const browser: any = isFirefox || isSafari ? global.browser : global.chrome;

export const runtime: UniversalRuntime = {
	isOpera,
	isFirefox,
	isSafari,
	isChrome,
	isEdgeChromium,
	isBlink,
	isExtension: !!global.chrome?.runtime,
	onConnect: browser?.runtime?.onConnect,
	onMessage: browser?.runtime?.onMessage,
	connect: browser?.runtime?.connect,
};
