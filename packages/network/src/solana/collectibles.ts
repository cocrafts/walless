import { Metaplex } from '@metaplex-foundation/js';
import { Connection, PublicKey } from '@solana/web3.js';

export const getNftsByOwner = async (
	connection: Connection,
	owner: PublicKey,
) => {
	const metaplex = new Metaplex(connection);
	return metaplex.nfts().findAllByOwner({ owner });
};

export const getNftCollections = async (
	connection: Connection,
	mintAddress: PublicKey,
) => {
	const metaplex = new Metaplex(connection);
	return metaplex.nfts().findByMint({ mintAddress });
};
