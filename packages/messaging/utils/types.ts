export type UnknownObject = Record<string, unknown>;

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

export type ChannelHashmap = Record<string, BroadcastChannel>;

export type MessengerSend = (
	channelId: string,
	payload: UnknownObject,
) => Promise<void>;

export type MessengerMessageListener = (
	channelId: string,
	handler: (payload: UnknownObject) => void,
) => void;

export interface Messenger {
	channels: ChannelHashmap;
	onMessage: MessengerMessageListener;
	send: MessengerSend;
}
