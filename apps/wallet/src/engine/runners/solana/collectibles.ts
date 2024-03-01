import type {
	JsonMetadata,
	Metadata,
	Nft,
	NftWithToken,
	Sft,
	SftWithToken,
} from '@metaplex-foundation/js';
import { Metaplex } from '@metaplex-foundation/js';
import type { Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { NetworkCluster } from '@walless/core';
import { logger, Networks } from '@walless/core';
import type { CollectibleDocument, CollectionDocument } from '@walless/store';
import {
	addCollectibleToStorage,
	addCollectionToStorage,
	getCollectionByIdFromStorage,
	storage,
} from 'utils/storage';

import { throttle } from './internal';

export type GenericNft = Nft | Sft | SftWithToken | NftWithToken;

export const getCollectiblesOnChain = async (
	connection: Connection,
	cluster: NetworkCluster,
	wallet: PublicKey,
): Promise<CollectibleDocument[]> => {
	const mpl = new Metaplex(connection);
	const rawNfts = await throttle(() => {
		return mpl.nfts().findAllByOwner({ owner: wallet });
	})();

	const nfts = await Promise.all(
		rawNfts.map(async (metadata) => {
			try {
				const nft = await loadCollectibleMetadata(mpl, metadata, wallet);

				return constructCollectibleDocument(wallet.toString(), nft, cluster);
			} catch (error) {
				logger.error('Failed to load collectible metadata', error);
			}
		}),
	);

	return nfts.filter((nft) => !!nft) as CollectibleDocument[];
};

type UpdateCollectibleResult = {
	collection?: CollectionDocument;
	collectible?: CollectibleDocument;
};

export const updateCollectibleToStorage = async (
	connection: Connection,
	cluster: NetworkCluster,
	collectible: CollectibleDocument,
): Promise<UpdateCollectibleResult> => {
	let collection: CollectionDocument | undefined;
	if (collectible.collectionAddress === collectible.account.mint) {
		const selfCollectionDocument: CollectionDocument = {
			_id: collectible.collectionId,
			type: 'Collection',
			network: collectible.network,
			cluster: collectible.cluster,
			metadata: collectible.metadata,
		};

		const res = await addCollectionToStorage(
			selfCollectionDocument._id,
			selfCollectionDocument,
		);

		collection = res?.doc;
	} else {
		collection = await updateRelatedCollection(
			connection,
			cluster,
			collectible,
		);
	}

	const res = await addCollectibleToStorage(collectible._id, collectible);

	return { collection, collectible: res?.doc };
};

export const loadCollectibleMetadata = async (
	mpl: Metaplex,
	metadata: Metadata | Nft | Sft,
	owner: PublicKey,
): Promise<SftWithToken | NftWithToken> => {
	const nft = {
		...(await mpl.nfts().load({
			metadata: metadata as Metadata<JsonMetadata<string>>,
			tokenOwner: owner,
		})),
	};

	if (!nft.json) {
		const res = await fetch(metadata.uri, { method: 'GET' });
		nft.json = await res.json();
		nft.jsonLoaded = true;
	}

	return nft as SftWithToken | NftWithToken;
};

export const constructCollectibleDocument = (
	address: string,
	nft: SftWithToken | NftWithToken,
	cluster: NetworkCluster,
) => {
	const collectibleId = `${address}/collectible/${nft.mint.address.toString()}`;
	const collectionAddress = nft.collection
		? nft.collection.address.toString()
		: nft.mint.address.toString();
	const collectionId = `${address}/collection/${collectionAddress}`;

	const collectibleDocument: CollectibleDocument = {
		_id: collectibleId,
		type: 'NFT',
		collectionId,
		collectionAddress,
		network: Networks.solana,
		metadata: {
			name: nft.json?.name,
			imageUri: nft.json?.image,
			symbol: nft.json?.symbol,
			description: nft.json?.description,
			attributes: nft.json?.attributes?.map((ele) => ({
				key: ele.trait_type || 'Unknown',
				value: ele.value || 'Unknown',
			})),
		},
		cluster,
		account: {
			owner: address,
			mint: nft.mint.address.toString(),
			address: nft.token.address.toString(),
			amount: 1, // default filter of metaplex (just get account which has amount equal to 1)
		},
	};

	return collectibleDocument;
};

export const updateRelatedCollection = async (
	connection: Connection,
	cluster: NetworkCluster,
	collectible: CollectibleDocument,
): Promise<CollectionDocument | undefined> => {
	const mpl = new Metaplex(connection);

	const storedCollection = await getCollectionByIdFromStorage(
		collectible.collectionId,
	);

	if (
		!storedCollection ||
		!storedCollection.metadata ||
		!storedCollection.metadata.name
	) {
		const collectionOnChain: GenericNft = await throttle(() => {
			return mpl.nfts().findByMint({
				mintAddress: new PublicKey(collectible.collectionAddress),
				loadJsonMetadata: true,
			});
		})();

		let metadata = collectionOnChain.json;
		if (!metadata) {
			try {
				const res = await fetch(collectionOnChain.uri, { method: 'GET' });
				metadata = await res.json();
			} catch (error) {
				logger.error('Failed to fetch collection metadata', error);

				// use collectible metadata for collection
				metadata = {
					name: collectible.metadata.name,
					image: collectible.metadata.imageUri,
					symbol: collectible.metadata.symbol,
					description: collectible.metadata.description,
				};
			}
		}

		const collection: CollectionDocument = {
			_id: collectible.collectionId,
			type: 'Collection',
			cluster,
			network: Networks.solana,
			metadata: {
				name: metadata?.name,
				description: metadata?.description,
				imageUri: metadata?.image,
				symbol: metadata?.symbol,
			},
		};

		const res = await addCollectionToStorage(collection._id, collection);
		return res?.doc;
	} else {
		return await storage.get<CollectionDocument>(collectible.collectionId);
	}
};
