import type {
	AssetMetadata,
	Collectible,
	Collection,
	CollectionV2,
	EncryptedWithPasscode,
	ExtensionConfig,
	HydratedKey,
	NetworkClusterMap,
	Networks,
	NftV2,
	Setting,
	System,
	Token,
	TokenV2,
	TransactionHistory,
	TrustedDomain,
	UnknownObject,
	Widget,
} from '@walless/core';

export type DocumentType =
	| 'Setting'
	// | 'EndpointMap'
	| 'ClusterMap'
	| 'EncryptionKey'
	| 'PrivateKey'
	| 'PublicKey'
	| 'Token'
	| 'Collection'
	| 'NFT'
	| 'Metadata'
	| 'TrustedDomain'
	| 'Widget'
	| 'Extension'
	| 'History';

export interface IndexedDocument {
	type: DocumentType;
	timestamp?: string;
}

export type PouchDocument<T> = PouchDB.Core.Document<
	T & IndexedDocument & { _rev?: string }
>;

export type SystemDocument = PouchDocument<System>;

export type SettingDocument = PouchDocument<Setting>;

export type NetworkClustersDocument = PouchDocument<NetworkClusterMap>;

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

export type TransactionHistoryDocument = PouchDocument<TransactionHistory>;

export type TypedFind = <T extends object, F extends object = never>(
	request?: PouchDB.Find.FindRequest<F> | undefined,
) => Promise<{
	docs: Array<T>;
	warning?: string | undefined;
}>;

export type NftDocumentV2<T extends NftV2 = NftV2> = PouchDocument<T>;

export type CollectionDocumentV2<T extends CollectionV2 = CollectionV2> =
	PouchDocument<T>;

export type TokenDocumentV2<T extends TokenV2 = TokenV2> = PouchDocument<T>;
