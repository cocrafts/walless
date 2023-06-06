import { type Token } from './entityTypes';

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
	ethereum = 'ethereum',
	solana = 'solana',
	sui = 'sui',
	tezos = 'tezos',
}

export enum Endpoints {
	mainnet = 'mainnet',
	testnet = 'testnet',
	devnet = 'devnet',
}

export type Endpoint = Endpoints | string;

export interface TransactionPayload {
	sender: string;
	receiver: string;
	amount: number;
	network: Networks;
	token: Token;
	passcode?: string;
}

export interface LegacySolanaMetadata {
	address: string;
	name?: string;
	symbol?: string;
	decimals?: number;
	logoURI?: string;
	extensions?: Record<string, string>;
	tags: string[];
}

export interface LegacyMetadataSource {
	name: string;
	logoURI: string;
	keywords: string[];
	timestamp: string;
	tokens: LegacySolanaMetadata[];
}
