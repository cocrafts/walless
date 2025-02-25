import { ChromeChannel } from '@metacraft/crab/chrome';
import type { Response } from '@metacraft/crab/core';
import { Timeout, type UnknownObject } from '@walless/core';
import { Channels } from '@walless/messaging';

const chromeChannel = new ChromeChannel(Channels.kernel);
export const initializeMessaging = async () => {
	window.postMessage({ from: 'walless-content-script-loaded' });
	window.addEventListener(
		'message',
		async ({ source, data }): Promise<void> => {
			const { from, type } = data || {};
			if (!from || source !== window) return;

			if (from.startsWith('walless@sdk')) {
				if (type == 'sign-in-response') {
					await chrome.runtime.sendMessage(data);
				} else {
					// TODO: use timeout from sdk that include in data
					const newResponse = await chromeChannel.request<
						Response<UnknownObject>
					>(
						{
							...data,
							id: data.requestId,
						},
						data.timeout || Timeout.sixtySeconds,
					);

					window.postMessage({
						...newResponse,
						from: 'walless@kernel',
					});
				}
			}
		},
		false,
	);
};

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
