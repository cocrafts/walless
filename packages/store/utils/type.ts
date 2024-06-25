import type {
	AssetMetadataV1,
	CollectibleV1,
	Collection,
	CollectionV1,
	EncryptedWithPasscode,
	ExtensionConfig,
	GeneralTransactionHistory,
	HydratedKey,
	NetworkClusterMap,
	Nft,
	PublicKey,
	Setting,
	System,
	Token,
	TokenV1,
	TrustedDomain,
	Widget,
} from '@walless/core';

import type helpers from '../plugins';

export type Database = Omit<PouchDB.Database, 'find'> &
	typeof helpers & { find: TypedFind };

export type DocumentType =
	| 'Setting'
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

export type PublicKeyDocument<T extends PublicKey = PublicKey> =
	PouchDocument<T>;

export type ExtensionDocument = PouchDocument<ExtensionConfig>;

export type WidgetDocument = PouchDocument<Widget>;

export type TokenDocumentV1 = PouchDocument<TokenV1>;

export type MetadataDocumentV1 = PouchDocument<AssetMetadataV1>;

export type TrustedDomainDocument = PouchDocument<TrustedDomain>;

export type CollectionDocumentV1 = PouchDocument<CollectionV1>;

export type CollectibleDocumentV1 = PouchDocument<CollectibleV1>;

export type HistoryDocument<
	T extends GeneralTransactionHistory = GeneralTransactionHistory,
> = PouchDocument<T>;

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
