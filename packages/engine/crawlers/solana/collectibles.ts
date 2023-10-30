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

import { collectibleActions, collectionState } from '../../state/collectible';
import type { RunnerContext } from '../../utils/type';

import { throttle } from './shared';

type NftType = Nft | Sft | SftWithToken | NftWithToken;

interface CollectiblesByAddressOptions {
	context: RunnerContext<Connection>;
	address: string;
}

export const solanaCollectiblesByAddress = async ({
	context,
	address,
}: CollectiblesByAddressOptions) => {
	const { connection, endpoint } = context;
	const mpl = new Metaplex(connection);
	const rawNfts = await throttle(() => {
		return mpl.nfts().findAllByOwner({ owner: new PublicKey(address) });
	})();

	const nfts = await Promise.all(
		rawNfts.map((metadata) => {
			return mpl
				.nfts()
				.load({ metadata: metadata as Metadata<JsonMetadata<string>> });
		}),
	);

	const promises = nfts
		.filter((ele) => ele.json)
		.map(async (nft) => {
			return addCollectibleToStorage(connection, endpoint, address, nft);
		});

	await Promise.all(promises);
};

export const addCollectibleToStorage = async (
	connection: Connection,
	endpoint: Endpoint,
	address: string,
	nft: NftType,
) => {
	const mpl = new Metaplex(connection);
	let collectionMetadata: NftType | undefined = undefined;

	if (nft.collection) {
		collectionMetadata = await mpl
			.nfts()
			.findByMint({ mintAddress: nft.collection.address });
	}

	const collectionAddress =
		collectionMetadata?.address.toString() ||
		nft.collection?.address.toString() ||
		nft.address.toString();
	const collectionId = `${address}/collection/${collectionAddress}`;
	const collectibleId = `${address}/collectible/${nft.mint.address.toString()}`;

	const collection = collectionState.map.get(collectionId);
	if (!collection) {
		collectibleActions.setStorageCollection(collectionId, {
			_id: collectionId,
			type: 'Collection',
			network: Networks.solana,
			metadata: {
				name:
					collectionMetadata?.json?.name ||
					nft.json?.collection?.name ||
					nft.name,
				description:
					collectionMetadata?.json?.description || nft.json?.description || '',
				imageUri: collectionMetadata?.json?.image || nft.json?.image,
				symbol: collectionMetadata?.json?.symbol || nft.json?.symbol,
			},
			count: 1,
		});
	} else {
		collection.count += 1;
	}

	const collectibleId = `${address}/${nft.mint.address.toString()}`;
	collectibleActions.setStorageCollectible(collectibleId, {
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
	});
};
