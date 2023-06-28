import { runtime } from '@walless/core';
import { modules } from '@walless/ioc';
import {
	type EncryptedMessage,
	type MessengerCallback,
	type MessengerMessageListener,
	type MessengerSend,
	Channels,
	createMessenger,
	decryptMessage,
	PopupType,
	ResponseCode,
	ResponseMessage,
} from '@walless/messaging';

import { onKernelMessage } from './handlers/kernel';
import { response } from './utils/requestPool';

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
		channels.map((id) => modules.encryptionKeyVault.createAndHydrate(id)),
	);

	if (runtime.isExtension) {
		const callbackRegistry: Record<string, MessengerCallback> = {};

		runtime.onConnect.addListener((port) => {
			const handleInComingMessage = async (message: EncryptedMessage) => {
				const registeredCallback = callbackRegistry[port.name];
				const isEncrypted = !!message?.iv;

				if (registeredCallback) {
					if (isEncrypted) {
						const key = await modules.encryptionKeyVault.get(port.name);
						const decrypted = await decryptMessage(message, key);

						registeredCallback?.(decrypted, port);
					} else {
						registeredCallback?.(message as never, port);
					}
				}
			};

			const handleDisconnect = () => {
				if (port.name.includes('/')) {
					const [popupType, requestId] = port.name.split('/');
					if (popupType === PopupType.REQUEST_CONNECT_POPUP) {
						try {
							response(requestId, ResponseCode.REJECTED, {
								message: ResponseMessage.REJECT_REQUEST_CONNECT,
							});
						} catch (error) {
							return;
						}
					} else if (popupType === PopupType.SIGNATURE_POPUP) {
						try {
							response(requestId, ResponseCode.REJECTED, {
								message: ResponseMessage.REJECT_COMMON_REQUEST,
							});
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
			console.log(payload, message);
		};

		registerIncomingMessage = (channelId, handler) => {
			callbackRegistry[channelId] = handler;
		};
	} else {
		const encryptedMessenger = createMessenger(modules.encryptionKeyVault);

		sendMessage = encryptedMessenger.send;
		registerIncomingMessage = encryptedMessenger.onMessage;
	}

	registerIncomingMessage?.('kernel', onKernelMessage);
};
