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
	isSafari: boolean;
	isChrome: boolean;
	isEdgeChromium: boolean;
	isBlink: boolean;
	isExtension: boolean;
	onConnect: chrome.runtime.ExtensionConnectEvent;
	onMessage: chrome.runtime.ExtensionMessageEvent;
	connect: (connectInfo?: chrome.runtime.ConnectInfo) => chrome.runtime.Port;
}
