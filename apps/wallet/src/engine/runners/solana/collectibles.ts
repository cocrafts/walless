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
import type { Endpoint } from '@walless/core';
import { Networks } from '@walless/core';
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
	endpoint: Endpoint,
	wallet: PublicKey,
): Promise<CollectibleDocument[]> => {
	const mpl = new Metaplex(connection);
	const rawNfts = await throttle(() => {
		return mpl.nfts().findAllByOwner({ owner: wallet });
	})();

	const nfts = await Promise.all(
		rawNfts.map(async (metadata) => {
			const nft = await loadCollectibleMetadata(mpl, metadata, wallet);
			return constructCollectibleDocument(wallet.toString(), nft, endpoint);
		}),
	);

	return nfts;
};

type UpdateCollectibleResult = {
	collection?: CollectionDocument;
	collectible?: CollectibleDocument;
};

export const updateCollectibleToStorage = async (
	connection: Connection,
	endpoint: Endpoint,
	collectible: CollectibleDocument,
): Promise<UpdateCollectibleResult> => {
	let collection: CollectionDocument | undefined;
	if (collectible.collectionAddress === collectible.account.mint) {
		const selfCollectionDocument: CollectionDocument = {
			...collectible,
			_id: collectible.collectionId,
			type: 'Collection',
		};

		const res = await addCollectionToStorage(
			selfCollectionDocument._id,
			selfCollectionDocument,
		);

		collection = res?.doc;
	} else {
		collection = await updateRelatedCollection(
			connection,
			endpoint,
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
	let nft = await mpl.nfts().load({
		metadata: metadata as Metadata<JsonMetadata<string>>,
		tokenOwner: owner,
	});

	// TODO: need to resolve fetch metadata of nft using metaplex on mobile
	if (metadata.jsonLoaded && !metadata.json) {
		if ('mintAddress' in metadata) {
			const nftByMint = await mpl.nfts().findByMint({
				mintAddress: metadata.mintAddress,
				loadJsonMetadata: metadata.jsonLoaded,
				tokenOwner: owner,
			});
			const jsonRes = await fetch(metadata.uri, { method: 'GET' });
			nft = {
				...nftByMint,
				json: await jsonRes.json(),
				jsonLoaded: true,
			};
		}
	}

	return nft as SftWithToken | NftWithToken;
};

export const constructCollectibleDocument = (
	address: string,
	nft: SftWithToken | NftWithToken,
	endpoint: Endpoint,
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
		endpoint,
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
	endpoint: Endpoint,
	collectible: CollectibleDocument,
): Promise<CollectionDocument | undefined> => {
	const mpl = new Metaplex(connection);

	const storedCollection = await getCollectionByIdFromStorage(
		collectible.collectionId,
	);

	if (!storedCollection) {
		const collectionMetadata: GenericNft = await mpl.nfts().findByMint({
			mintAddress: new PublicKey(collectible.collectionAddress),
		});

		const collection: CollectionDocument = {
			_id: collectible.collectionId,
			type: 'Collection',
			endpoint,
			network: Networks.solana,
			metadata: {
				name: collectionMetadata?.json?.name,
				description: collectionMetadata?.json?.description,
				imageUri: collectionMetadata?.json?.image,
				symbol: collectionMetadata?.json?.symbol,
			},
		};

		const res = await addCollectionToStorage(collection._id, collection);
		return res?.doc;
	} else {
		return await storage.get<CollectionDocument>(collectible.collectionId);
	}
};