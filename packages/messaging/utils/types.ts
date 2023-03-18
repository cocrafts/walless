import { ChannelHashmap, MiniBroadcast, UnknownObject } from '@walless/core';

export enum Channels {
	'kernel' = 'kernel',
	'background' = 'background',
	'ui' = 'ui',
	'popup' = 'popup',
	'content' = 'content',
}

export interface EncryptedMessage {
	ciphered: string;
	iv: string;
}

interface IdentifiedPayload {
	id?: string;
}

export type MessagePayload = UnknownObject & IdentifiedPayload;
export type ResponsePayload = UnknownObject & IdentifiedPayload;

export interface RequestMetadata {
	id: string;
	timestamp: Date;
	timeout: number;
	resolve: (payload: unknown) => void;
	reject: (error: Error) => void;
}

export type GetKeyVault = (id: string) => Promise<CryptoKey>;
export type CreateAndHydrateKeyVault = (id: string) => Promise<CryptoKey>;

export interface EncryptionKeyVault {
	get: GetKeyVault;
	createAndHydrate: CreateAndHydrateKeyVault;
}

export type MessengerSend = (
	channelId: string,
	payload: UnknownObject,
) => Promise<void>;

export type MessengerRequest = (
	channelId: string,
	payload: UnknownObject,
	timeout?: number,
) => Promise<UnknownObject>;

export type MessengerCallback = (
	payload: UnknownObject,
	sender: MiniBroadcast,
) => void;

export type MessengerMessageListener = (
	channelId: string,
	handler: MessengerCallback,
) => void;

export interface Messenger {
	channels: ChannelHashmap;
	onMessage: MessengerMessageListener;
	send: MessengerSend;
	request: MessengerRequest;
}
