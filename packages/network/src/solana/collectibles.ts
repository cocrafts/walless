import { Metaplex } from '@metaplex-foundation/js';
import type { Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import type { MetadataDocument } from '@walless/store';

export type GetNftCollections = (
	connection: Connection,
	mintAddress: string,
) => Promise<MetadataDocument>;

export const getNftsByOwner = async (
	connection: Connection,
	owner: PublicKey,
) => {
	const metaplex = new Metaplex(connection);
	return metaplex.nfts().findAllByOwner({ owner });
};

export const getNftCollections: GetNftCollections = async (
	connection: Connection,
	mintAddress: string,
) => {
	const result: MetadataDocument = {
		_id: mintAddress,
		type: 'Metadata',
		network: Networks.solana,
		timestamp: new Date().toISOString(),
	};
	const mint = new PublicKey(mintAddress);
	const metaplex = new Metaplex(connection);
	const collection = await metaplex.nfts().findByMint({ mintAddress: mint });
	result.name = collection.json?.name;
	result.symbol = collection.json?.symbol;
	result.imageUri = collection.json?.image;

	return result;
};
