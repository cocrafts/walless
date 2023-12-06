import type {
	ChannelHashmap,
	MiniBroadcast,
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

export enum ResponseCode {
	SUCCESS,
	REQUIRE_PASSCODE,
	WRONG_PASSCODE,
	ERROR,
}

export enum RequestType {
	REQUEST_CONNECT,
	REQUEST_DISCONNECT,
	GET_ENDPOINT_ON_SOLANA,
	SIGN_SEND_TRANSACTION_ON_SOLANA,
	SIGN_TRANSACTION_ABSTRACTION_FEE_ON_SOLANA,
	SIGN_TRANSACTION_ON_SOLANA,
	SIGN_MESSAGE_ON_SOLANA,
	SIGH_EXECUTE_TRANSACTION_ON_SUI,
	SIGN_TRANSACTION_ON_SUI,
	SIGN_MESSAGE_ON_SUI,
	TRANSFER_TEZOS_TOKEN,
	RESOLVE_REQUEST_CONNECT,
	RESOLVE_REQUEST_SIGNATURE,
	REQUEST_PAYLOAD,
	INSTALL_LAYOUT,
	CHECK_INSTALLED_LAYOUT,
	OPEN_LAYOUT_POPUP,
	UPDATE_DIRECT_TRANSFER_ON_APTOS,
	CLAIM_TOKEN_ON_APTOS,
	TRANSFER_COIN_ON_APTOS,
	TRANSFER_TOKEN_ON_APTOS,
	REQUEST_PERMISSION_ON_TEZOS = 'permission_request',
	REQUEST_OPERATION_ON_TEZOS = 'operation_request',
	SIGN_PAYLOAD_ON_TEZOS = 'sign_payload_request',
}

export enum PopupType {
	REQUEST_CONNECT_POPUP = 'request-connect-popup',
	SIGNATURE_POPUP = 'request-signature-popup',
	REQUEST_INSTALL_LAYOUT_POPUP = 'request-install-layout-popup',
}

export enum ResponseMessage {
	REJECT_REQUEST_CONNECT = 'Connect request has been rejected',
	REJECT_COMMON_REQUEST = 'Request has been rejected by user',
	REJECT_INSTALL_LAYOUT_REQUEST = 'Install layout request has been rejected',
}
