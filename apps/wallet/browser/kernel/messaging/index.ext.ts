import { ChromeKernel } from '@metacraft/crab/chrome';
import {
	PopupType,
	RequestType,
	ResponseCode,
	ResponseMessage,
	runtime,
} from '@walless/core';
import type {
	EncryptedMessage,
	MessagePayload,
	MessengerCallback,
} from '@walless/messaging';
import { Channels, decryptMessage } from '@walless/messaging';

import * as common from '../handlers/common';
import { onKernelMessage } from '../handlers/kernel';
import { checkConnection } from '../utils/middleware';
import { respond } from '../utils/requestPool';

import { encryptionKeyVault, initializeVaultKeys } from './shared';

/* Manually forward/coordinate communication using chrome.runtime.port messaging,
 * included encryption support */
export const initializeMessaging = async (): Promise<void> => {
	await initializeVaultKeys();

	const callbackRegistry: Record<string, MessengerCallback> = {};

	runtime.onConnect.addListener((port: chrome.runtime.Port) => {
		const handleInComingMessage = async (
			message: EncryptedMessage | MessagePayload,
		) => {
			const registeredCallback = callbackRegistry[port.name];
			const isEncrypted = !!message?.iv;

			if (registeredCallback) {
				if (isEncrypted) {
					const key = await encryptionKeyVault.get(port.name);
					const decrypted = await decryptMessage(
						message as EncryptedMessage,
						key,
					);
					registeredCallback?.(decrypted, port);
				} else {
					registeredCallback?.(message as never, port);
				}
			}
		};

		const handleDisconnect = (port: chrome.runtime.Port) => {
			if (port.name.includes('/')) {
				const [id, requestId] = port.name.split('/');
				if (id === PopupType.REQUEST_CONNECT_POPUP) {
					try {
						respond(requestId, ResponseCode.ERROR, {
							error: ResponseMessage.REJECT_REQUEST_CONNECT,
						});
					} catch (error) {
						return;
					}
				} else if (id === PopupType.SIGNATURE_POPUP) {
					try {
						respond(requestId, ResponseCode.ERROR, {
							error: ResponseMessage.REJECT_COMMON_REQUEST,
						});
					} catch (error) {
						return;
					}
				} else if (id === PopupType.REQUEST_INSTALL_LAYOUT_POPUP) {
					try {
						respond(requestId, ResponseCode.ERROR);
					} catch (error) {
						return;
					}
				}
			}

			port.onMessage.removeListener(handleInComingMessage);
			port.onDisconnect.removeListener(handleDisconnect);
		};

		port.onMessage.addListener(handleInComingMessage);
		port.onDisconnect.addListener(handleDisconnect);
	});

	callbackRegistry.kernel = onKernelMessage;

	const kernel = new ChromeKernel<Channels, RequestType>();
	kernel
		.channel(Channels.kernel)
		.handle(RequestType.REQUEST_CONNECT)
		.use(checkConnection(kernel))
		.use(common.connect)
		.handle(RequestType.REQUEST_DISCONNECT)
		.use(common.disconnect)

		.channel(Channels.popup)
		.handle(RequestType.REQUEST_PAYLOAD)
		.use(common.requestPayload(kernel))
		.handle(RequestType.REQUEST_CONNECT)
		.use(kernel.handleCrossResolvingMiddleware)
		.run();
	console.log(kernel, '<<< kerenel');
};
