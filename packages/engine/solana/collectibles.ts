import {
	type JsonMetadata,
	type Metadata,
	type Nft,
	Metaplex,
} from '@metaplex-foundation/js';
import { type Connection, PublicKey } from '@solana/web3.js';
import { type Endpoint, Networks } from '@walless/core';
import {
	type CollectibleDocument,
	type CollectionDocument,
} from '@walless/store';

interface CollectiblesByAddressOptions {
	endpoint: Endpoint;
	connection: Connection;
	address: string;
}

export const solanaCollectiblesByAddress = async ({
	endpoint,
	connection,
	address,
}: CollectiblesByAddressOptions): Promise<{
	collections: CollectionDocument[];
	collectibles: CollectibleDocument[];
}> => {
	const mpl = new Metaplex(connection);

	const collections: CollectionDocument[] = [];
	const collectibles: CollectibleDocument[] = [];

	const nfts = await Promise.all(
		(
			await mpl.nfts().findAllByOwner({ owner: new PublicKey(address) })
		).map((metadata) =>
			mpl.nfts().load({ metadata: metadata as Metadata<JsonMetadata<string>> }),
		),
	);

	const promises = nfts
		.filter((ele) => ele.json)
		.map(async (nft) => {
			let collectionMetadata: Nft | undefined = undefined;

			if (nft.collection) {
				collectionMetadata = (await mpl
					.nfts()
					.findByMint({ mintAddress: nft.collection.address })) as Nft;
			}

			const collectionId = `${address}/${
				collectionMetadata?.address.toString() ||
				nft.collection?.address.toString() ||
				nft.address.toString()
			}`;

			if (!collections.find((ele) => ele._id === collectionId)) {
				collections.push({
					_id: collectionId,
					type: 'Collection',
					network: Networks.solana,
					metadata: {
						name:
							collectionMetadata?.json?.name ||
							nft.json?.collection?.name ||
							nft.name,
						description:
							collectionMetadata?.json?.description ||
							nft.json?.description ||
							'',
						imageUri: collectionMetadata?.json?.image || nft.json?.image,
						symbol: collectionMetadata?.json?.symbol || nft.json?.symbol,
					},
				});
			}

			collectibles.push({
				_id: `${address}/${nft.mint.address.toString()}`,
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
				},
			});
		});

	await Promise.all(promises);

	return {
		collections,
		collectibles,
	};
};
