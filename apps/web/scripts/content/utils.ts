import type { UnknownObject } from '@walless/core';
import { decode, encode } from 'bs58check';

export const injectScript = (scriptUri: string) => {
	try {
		const container = document.head || document.documentElement;
		const scriptTag = document.createElement('script');
		scriptTag.setAttribute('async', 'false');
		scriptTag.src = chrome.runtime.getURL(scriptUri);
		container.insertBefore(scriptTag, container.children[0]);
		container.removeChild(scriptTag);
	} catch (error) {
		console.error('script injection failed.', error);
	}
};

export const serialize = (data: UnknownObject): string => {
	return encode(Buffer.from(JSON.stringify(data)));
};

export const deserialize = (encoded: string): UnknownObject => {
	return JSON.parse(decode(encoded).toString());
};
