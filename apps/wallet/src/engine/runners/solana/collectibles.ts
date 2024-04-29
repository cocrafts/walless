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
import type {
	NetworkCluster,
	SolanaCollectible,
	SolanaCollection,
} from '@walless/core';
import { logger, Networks } from '@walless/core';
import type { CollectionDocument, NftDocument } from '@walless/store';
import {
	addCollectibleToStorage,
	addCollectionToStorage,
	getCollectionByIdFromStorage,
} from 'utils/storage';

import { throttle } from './internal';

export type GenericNft = Nft | Sft | SftWithToken | NftWithToken;
type SolanaCollectibleDocument = NftDocument<SolanaCollectible>;
type SolanaCollectionDocument = CollectionDocument<SolanaCollection>;

export const queryCollectibles = async (
	connection: Connection,
	cluster: NetworkCluster,
	wallet: PublicKey,
) => {
	const mpl = new Metaplex(connection);
	const rawNfts = await throttle(() => {
		return mpl.nfts().findAllByOwner({ owner: wallet });
	})();

	return await Promise.all(
		rawNfts.map(async (metadata) => {
			try {
				const nft = await loadCollectibleMetadata(mpl, metadata, wallet);

				const collectible = constructCollectibleDocument(
					wallet.toString(),
					nft,
					cluster,
				);
				if (collectible) {
					return await updateCollectibleToStorage(
						connection,
						cluster,
						collectible,
					);
				}
			} catch (error) {
				logger.error('Failed to load collectible metadata', error);
			}
		}),
	);
};

type UpdateCollectibleResult = {
	collection?: SolanaCollectionDocument;
	collectible?: SolanaCollectibleDocument;
};

export const updateCollectibleToStorage = async (
	connection: Connection,
	cluster: NetworkCluster,
	collectible: NftDocument<SolanaCollectible>,
): Promise<UpdateCollectibleResult> => {
	let collection: CollectionDocument<SolanaCollection> | undefined;
	if (!collectible.collectionId) return { collectible };

	const isUsingSelfCollection = collectible.collectionId === collectible._id;
	if (isUsingSelfCollection) {
		const selfCollectionDocument: SolanaCollectionDocument = {
			_id: collectible.collectionId,
			type: 'Collection',
			network: collectible.network,
			cluster: collectible.cluster,
			name: collectible.name,
			symbol: collectible.symbol,
			image: collectible.image,
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

	await addCollectibleToStorage(collectible._id, collectible);

	return { collection, collectible };
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
): NftDocument<SolanaCollectible> => {
	const collectibleId = `${address}/collectible/${nft.mint.address.toString()}`;
	const collectionAddress = nft.collection
		? nft.collection.address.toString()
		: nft.mint.address.toString();
	const collectionId = `${address}/collection/${collectionAddress}`;

	const collectibleDocument: NftDocument<SolanaCollectible> = {
		_id: collectibleId,
		type: 'NFT',
		network: Networks.solana,
		cluster,
		owner: address,
		mint: nft.mint.address.toString(),
		ata: nft.token.address.toString(),
		amount: 1, // default filter of metaplex (just get account which has amount equal to 1)
		name: nft.json?.name || 'Unknown',
		symbol: nft.json?.symbol || 'Unknown',
		image: nft.json?.image || '',
		description: nft.json?.description,
		attributes: nft.json?.attributes?.map((ele) => ({
			key: ele.trait_type || 'Unknown',
			value: ele.value || 'Unknown',
		})),
		collectionId,
		collectionAddress,
	};

	return collectibleDocument;
};

export const updateRelatedCollection = async (
	connection: Connection,
	cluster: NetworkCluster,
	collectible: SolanaCollectibleDocument,
): Promise<SolanaCollectionDocument | undefined> => {
	const mpl = new Metaplex(connection);

	const collectionId = collectible.collectionId;
	if (!collectionId) return;

	const storedCollection =
		await getCollectionByIdFromStorage<SolanaCollectionDocument>(collectionId);

	if (!storedCollection) {
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

				// use collectible metadata for collection if failed to query collection metadata
				metadata = {
					name: collectible.name,
					image: collectible.image,
					description: collectible.description,
				};
			}
		}

		const collection: SolanaCollectionDocument = {
			_id: collectionId,
			type: 'Collection',
			cluster,
			network: Networks.solana,
			name: metadata?.name || 'Unknown',
			symbol: metadata?.symbol || 'Unknown',
			image: metadata?.image || '',
			description: metadata?.description,
		};

		await addCollectionToStorage(collection._id, collection);

		return collection;
	} else {
		return storedCollection;
	}
};
