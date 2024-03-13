import type { CollectibleDocumentV1, TokenDocumentV1 } from '@walless/store';

import type { CollectibleV1, TokenV1 } from './entity';

export interface EncryptedWithPasscode {
	iv: string;
	salt: string;
	ct: string;
	mac: string;
}

export interface HydratedKey {
	jwk: JsonWebKey;
	keyParams: AesKeyGenParams;
	keyUsages: ReadonlyArray<KeyUsage>;
}

export type AesAlgorithm = 'AES-GCM' | 'AES-CBC' | 'AES-CTR';
export type AesKeyLength = 128 | 192 | 256;

export interface UniversalRuntime {
	isOpera: boolean;
	isFirefox: boolean;
	isChrome: boolean;
	isEdgeChromium: boolean;
	isBlink: boolean;
	isServer: boolean;
	isBrowser: boolean;
	isExtension: boolean;
	isIOS: boolean;
	isAndroid: boolean;
	isMobile: boolean;
	onConnect: chrome.runtime.ExtensionConnectEvent;
	onMessage: chrome.runtime.ExtensionMessageEvent;
	connect: (connectInfo?: chrome.runtime.ConnectInfo) => chrome.runtime.Port;
}

/* eslint-disable-next-line */
export type UnknownObject = Record<string, any>;

export interface RequestContext {
	timestamp: Date;
	timeout: number;
	resolve: (response: UnknownObject) => void;
	reject: (e: Error) => void;
}

export type MiniBroadcast = BroadcastChannel | chrome.runtime.Port;
export type UniBroadcast = BroadcastChannel & chrome.runtime.Port;
export type ChannelHashmap = Record<string, MiniBroadcast>;
export type RequestHashmap = Record<string, RequestContext>;

export enum Networks {
	tezos = 'tezos',
	solana = 'solana',
	sui = 'sui',
	aptos = 'aptos',
}

export enum NetworkClusters {
	mainnet = 'mainnet',
	testnet = 'testnet',
	devnet = 'devnet',
}

export type NetworkCluster = NetworkClusters | string;

export interface TransactionPayload {
	sender: string;
	receiver: string;
	amount: number;
	network: Networks;
	tokenForFee: TokenV1;
	token: TokenDocumentV1 | CollectibleDocumentV1;
	passcode?: string;
}

export enum Timeout {
	thirtySeconds = 30000,
	sixtySeconds = 60000,
}

export interface TransactionHistoryV1 {
	id: string;
	signature: string;
	network: Networks;
	transactionType: 'Sent' | 'Received';
	status: 'Success' | 'Pending' | 'Failed';
	sender: string;
	receiver: string;
	token:
		| Omit<TokenV1, 'account'>
		| Omit<CollectibleV1, 'account' | 'collectionId' | 'collectionAddress'>;
	tokenForFee: TokenV1;
	fee: number;
	preBalance?: number;
	postBalance?: number;
	amount: number;
	date: Date;
}

export interface AptosToken {
	ownerAddress: string;
	creatorAddress: string;
	collectionId: string;
	collectionName: string;
	collectionUri: string;
	tokenDataId: string;
	name: string;
	description: string;
	uri: string;
	lastTransactionVersion: number;
	lastTransactionTimestamp: number;
	propertyVersion: number;
	amount: number;
}

export type AptosPendingToken = AptosToken & {
	fromAddress: string;
	toAddress: string;
};
