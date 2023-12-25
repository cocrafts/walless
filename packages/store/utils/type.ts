import type {
	AssetMetadata,
	Collectible,
	Collection,
	EncryptedWithPasscode,
	Endpoint,
	EndpointMap,
	ExtensionConfig,
	HydratedKey,
	Networks,
	Setting,
	System,
	Token,
	TrustedDomain,
	UnknownObject,
	Widget,
} from '@walless/core';

export type DocumentType =
	| 'Setting'
	| 'EndpointMap'
	| 'EncryptionKey'
	| 'PrivateKey'
	| 'PublicKey'
	| 'Token'
	| 'Collection'
	| 'NFT'
	| 'Metadata'
	| 'TrustedDomain'
	| 'Widget'
	| 'Extension';

export interface IndexedDocument {
	type: DocumentType;
	network?: Networks;
	endpoint?: Endpoint;
	timestamp?: string;
}

export type PouchDocument<T> = PouchDB.Core.Document<
	T & IndexedDocument & { _rev?: string }
>;

export type SystemDocument = PouchDocument<System>;

export type SettingDocument = PouchDocument<Setting>;

export type EndpointsDocument = PouchDocument<EndpointMap>;

export type EncryptionKeyDocument = PouchDocument<HydratedKey>;

export type PrivateKeyDocument = PouchDocument<
	EncryptedWithPasscode & {
		keyType: string;
	}
>;

export type PublicKeyDocument = PouchDocument<{
	privateKeyId: string;
	network: Networks;
	meta?: UnknownObject;
}>;

export type ExtensionDocument = PouchDocument<ExtensionConfig>;

export type WidgetDocument = PouchDocument<Widget>;

export type TokenDocument = PouchDocument<Token>;

export type MetadataDocument = PouchDocument<AssetMetadata>;

export type TrustedDomainDocument = PouchDocument<TrustedDomain>;

export type CollectionDocument = PouchDocument<Collection>;

export type CollectibleDocument = PouchDocument<Collectible>;

export type TypedFind = <T extends object, F extends object = never>(
	request?: PouchDB.Find.FindRequest<F> | undefined,
) => Promise<{
	docs: Array<T>;
	warning?: string | undefined;
}>;
