import type {
	AssetMetadataV1,
	CollectibleV1,
	Collection,
	CollectionV1,
	EncryptedWithPasscode,
	ExtensionConfig,
	HydratedKey,
	NetworkClusterMap,
	Networks,
	Nft,
	Setting,
	System,
	Token,
	TokenV1,
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

export type TokenDocumentV1 = PouchDocument<TokenV1>;

export type MetadataDocumentV1 = PouchDocument<AssetMetadataV1>;

export type TrustedDomainDocument = PouchDocument<TrustedDomain>;

export type CollectionDocumentV1 = PouchDocument<CollectionV1>;

export type CollectibleDocumentV1 = PouchDocument<CollectibleV1>;

export type TransactionHistoryDocument = PouchDocument<TransactionHistory>;

export type TypedFind = <T extends object, F extends object = never>(
	request?: PouchDB.Find.FindRequest<F> | undefined,
) => Promise<{
	docs: Array<T>;
	warning?: string | undefined;
}>;

export type NftDocument<T extends Nft = Nft> = PouchDocument<T>;

export type CollectionDocument<T extends Collection = Collection> =
	PouchDocument<T>;

export type TokenDocument<T extends Token = Token> = PouchDocument<T>;
