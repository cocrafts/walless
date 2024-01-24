import { logger, ResponseCode, runtime } from '@walless/core';
import type {
	EncryptedMessage,
	MessagePayload,
	MessengerCallback,
	MessengerMessageListener,
	MessengerSend,
} from '@walless/messaging';
import {
	Channels,
	createMessenger,
	decryptMessage,
	PopupType,
	ResponseMessage,
} from '@walless/messaging';

import { encryptionKeyVault } from '../bridge/utils';

import { onKernelMessage } from './handlers/kernel';
import { respond } from './utils/requestPool';

const channels = [
	Channels.ui,
	Channels.background,
	Channels.kernel,
	Channels.popup,
	Channels.content,
];

export let sendMessage: MessengerSend;
export let registerIncomingMessage: MessengerMessageListener;

export const initializeMessaging = async (): Promise<void> => {
	await Promise.all(
		channels.map((id) => encryptionKeyVault.createAndHydrate(id)),
	);

	if (runtime.isExtension) {
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

		sendMessage = async (channelId, payload) => {
			const message = `send message to channel: ${channelId} not available for Extension runtime, yet!`;
			logger.debug(message, payload);
		};

		registerIncomingMessage = (channelId, handler) => {
			callbackRegistry[channelId] = handler;
		};
	} else {
		const encryptedMessenger = createMessenger(encryptionKeyVault);

		sendMessage = encryptedMessenger.send;
		registerIncomingMessage = encryptedMessenger.onMessage;
	}

	registerIncomingMessage?.('kernel', onKernelMessage);
};
