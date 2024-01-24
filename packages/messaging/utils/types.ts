import type {
	ChannelHashmap,
	MiniBroadcast,
	ResponseCode,
	UnknownObject,
} from '@walless/core';

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

export type MessagePayload<T = unknown> = UnknownObject &
	IdentifiedPayload & {
		from: string;
		type: RequestType;
		requestId: string;
	} & T;

export type PureMessagePayload<T = unknown> = Omit<
	MessagePayload<T>,
	'requestId'
>;

export type ResponsePayload = UnknownObject &
	IdentifiedPayload & {
		from?: string;
		requestId?: string;
		responseCode?: ResponseCode;
	};

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
	payload: MessagePayload,
) => Promise<void>;

export type MessengerRequest = <T>(
	channelId: string,
	payload: PureMessagePayload<T> | MessagePayload<T>,
	timeout?: number,
) => Promise<UnknownObject>;

export type MessengerCallback = (
	payload: MessagePayload,
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
