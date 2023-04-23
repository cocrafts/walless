import { runtime } from '@walless/core';
import {
	Channels,
	createMessenger,
	decryptMessage,
	EncryptedMessage,
	MessengerCallback,
	MessengerMessageListener,
	MessengerSend,
} from '@walless/messaging';
import { isEmpty } from 'lodash';

import { onKernelMessage } from './handlers/kernel';
import { encryptionKeyVault } from './storage';
import { handleWalletClose, handleWalletOpen } from './subscribers';

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
		const portRegistry: Record<string, chrome.runtime.Port> = {};

		runtime.onConnect.addListener((port) => {
			const portId = extractPortId(port);
			const handleInComingMessage = async (message: EncryptedMessage) => {
				const registeredCallback = callbackRegistry[port.name];
				const isEncrypted = !!message?.iv;

				if (registeredCallback) {
					if (isEncrypted) {
						const key = await encryptionKeyVault.get(port.name);
						const decrypted = await decryptMessage(message, key);

						registeredCallback?.(decrypted, port);
					} else {
						registeredCallback?.(message as never, port);
					}
				}
			};

			const handleDisconnect = () => {
				port.onMessage.removeListener(handleInComingMessage);
				port.onDisconnect.removeListener(handleDisconnect);
				delete portRegistry[portId];

				if (isEmpty(portRegistry)) {
					handleWalletClose();
				}
			};

			port.onMessage.addListener(handleInComingMessage);
			port.onDisconnect.addListener(handleDisconnect);

			if (isEmpty(portRegistry)) handleWalletOpen();
			portRegistry[portId] = port;
		});

		sendMessage = async (channelId, payload) => {
			const message = `send message to channel: ${channelId} not available for Extension runtime, yet!`;
			console.log(payload, message);
		};

		registerIncomingMessage = (channelId, handler) => {
			callbackRegistry[channelId] = handler;
		};
	} else {
		const encryptedMessenger = createMessenger(encryptionKeyVault);

		sendMessage = encryptedMessenger.send;
		registerIncomingMessage = encryptedMessenger.onMessage;

		handleWalletOpen();
	}

	registerIncomingMessage?.('kernel', onKernelMessage);
};

export const extractPortId = (port: any) => {
	return port?.sender?.documentId || port?.sender?.id;
};
