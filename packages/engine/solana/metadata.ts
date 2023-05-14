import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { type Connection, PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { type Database, type MetadataDocument } from '@walless/store';

import { METADATA_PROGRAM_KEY, tokenMap } from './shared';

export type GetSolanaMetadataFunction = (
	connection: Connection,
	mintAddress: string,
) => Promise<MetadataDocument>;

export const getRemoteSolanaMetadata: GetSolanaMetadataFunction = async (
	connection,
	mintAddress,
): Promise<MetadataDocument> => {
	const result: MetadataDocument = {
		_id: mintAddress,
		type: 'Metadata',
		network: Networks.solana,
		timestamp: new Date().toISOString(),
	};
	const mint = new PublicKey(mintAddress);
	const [pda] = PublicKey.findProgramAddressSync(
		[Buffer.from('metadata'), METADATA_PROGRAM_KEY.toBuffer(), mint.toBuffer()],
		METADATA_PROGRAM_KEY,
	);
	const info = await connection.getAccountInfo(pda);
	if (!info?.data) return result;

	const [metadata] = Metadata.deserialize(info.data);
	result.name = metadata.data?.name;
	result.symbol = metadata.data?.symbol;
	result.imageUri = metadata.data?.uri;
	result.mpl = metadata;

	return result;
};

export const getLocalMetadata = (address: string) => {
	return tokenMap[address];
};

export const createLazySolanaMetadataFetcher = (
	storage: Database,
): GetSolanaMetadataFunction => {
	return async (connection, mintAddress) => {
		const local = getLocalMetadata(mintAddress);
		if (local) return local;

		const cached = await storage.safeGet<MetadataDocument>(mintAddress);
		const timestamp = new Date(cached?.timestamp || '2000-01-01');
		const cachedTime = new Date().getTime() - timestamp.getTime();
		if (cached && cachedTime < 1) return cached;

		const remote = await getRemoteSolanaMetadata(connection, mintAddress);
		await storage.upsert(mintAddress, async () => remote);
		return remote;
	};
};
