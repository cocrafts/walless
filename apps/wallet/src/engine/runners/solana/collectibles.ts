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
	getCollectibleByIdFromStorage,
	getCollectionByIdFromStorage,
	updateCollectionAmountToStorage,
} from 'utils/storage';

import { throttle } from './internal';
import type { SolanaContext } from './types';

type GenericNft = Nft | Sft | SftWithToken | NftWithToken;

export const getAndSyncCollectiblesOnChain = async (
	{ connection, endpoint }: SolanaContext,
	address: string,
) => {
	const mpl = new Metaplex(connection);
	const rawNfts = await throttle(() => {
		return mpl.nfts().findAllByOwner({ owner: new PublicKey(address) });
	})();

	const nfts = await Promise.all(
		rawNfts.map(async (metadata) => {
			const nft = mpl
				.nfts()
				.load({ metadata: metadata as Metadata<JsonMetadata<string>> });

			// TODO: need to resolve fetch metadata of nft using metaplex on mobile
			if (metadata.jsonLoaded && !metadata.json) {
				if ('mintAddress' in metadata) {
					const nftByMint = await mpl.nfts().findByMint({
						mintAddress: metadata.mintAddress,
						loadJsonMetadata: metadata.jsonLoaded,
					});
					const jsonRes = await fetch(metadata.uri, { method: 'GET' });
					return {
						...nftByMint,
						json: await jsonRes.json(),
						jsonLoaded: true,
					};
				}
			}

			return nft;
		}),
	);

	const promises = nfts
		.filter((ele) => ele.json)
		.map(async (nft) => {
			await updateCollectibleToStorage(connection, endpoint, address, nft);
		});

	await Promise.all(promises);
};

export const updateCollectibleToStorage = async (
	connection: Connection,
	endpoint: Endpoint,
	address: string,
	nft: GenericNft,
) => {
	let collectionId = await updateRelatedCollection(
		connection,
		endpoint,
		address,
		nft,
	);

	const collectibleAddress = nft.mint.address.toString();
	if (!collectionId) {
		const selfCollectionId = `${address}/collection/${collectibleAddress}`;
		collectionId = selfCollectionId;
	}

	const collectibleDocument: CollectibleDocument = constructCollectibleDocument(
		address,
		collectionId,
		nft,
		endpoint,
	);

	if (collectionId.includes(collectibleAddress)) {
		const selfCollectionDocument: CollectionDocument = {
			...collectibleDocument,
			_id: collectionId,
			type: 'Collection',
			count: 1,
		};

		addCollectionToStorage(collectionId, selfCollectionDocument);
	}

	addCollectibleToStorage(collectibleDocument._id, collectibleDocument);
};

export const constructCollectibleDocument = (
	address: string,
	collectionId: string,
	nft: GenericNft,
	endpoint: Endpoint,
) => {
	const collectibleId = `${address}/collectible/${nft.mint.address.toString()}`;

	const newCollectibleDocument: CollectibleDocument = {
		_id: collectibleId,
		type: 'NFT',
		collectionId,
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
			mint: nft.mint.address.toString(),
			owner: address,
			amount: 1, // default filter of metaplex (just get account which has amount equal to 1)
		},
	};

	return newCollectibleDocument;
};

export const updateRelatedCollection = async (
	connection: Connection,
	endpoint: Endpoint,
	address: string,
	nft: GenericNft,
) => {
	const mpl = new Metaplex(connection);

	if (!nft.collection) {
		return null;
	}

	const collectionAddress = nft.collection?.address.toString();

	const collectionId = `${address}/collection/${collectionAddress}`;
	const collectibleId = `${address}/collectible/${nft.mint.address.toString()}`;

	const storedCollection = await getCollectionByIdFromStorage(collectionId);
	const storedCollectible = await getCollectibleByIdFromStorage(collectibleId);

	if (!storedCollection) {
		const collectionMetadata: GenericNft = await mpl
			.nfts()
			.findByMint({ mintAddress: nft.collection.address });

		const newCollectionDocument: CollectionDocument = {
			_id: collectionId,
			type: 'Collection',
			endpoint,
			network: Networks.solana,
			metadata: {
				name: collectionMetadata?.json?.name,
				description: collectionMetadata?.json?.description,
				imageUri: collectionMetadata?.json?.image,
				symbol: collectionMetadata?.json?.symbol,
			},
			count: 1,
		};

		addCollectionToStorage(collectionId, newCollectionDocument);
	} else if (!storedCollectible) {
		updateCollectionAmountToStorage(
			collectionId,
			(storedCollection.count += 1),
		);
	}

	return storedCollection?._id;
};
