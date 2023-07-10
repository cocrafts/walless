import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { type Connection, PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { type Database, type MetadataDocument } from '@walless/store';

import { METADATA_PROGRAM_KEY, tokenMap } from './shared';

export interface GetSolanaMetadataOptions {
	storage: Database;
	connection: Connection;
	mintAddress: string;
}

export type GetSolanaMetadataFunction = (
	options: GetSolanaMetadataOptions,
) => Promise<MetadataDocument | undefined>;

export const getSolanaMetadata: GetSolanaMetadataFunction = async (options) => {
	const sources: Array<GetSolanaMetadataFunction> = [
		getLocalSolanaMetadata,
		getCachedSolanaMetadata,
		getRemoteSolanaMetadata,
	];

	for (const fetcher of sources) {
		const metadata = await fetcher(options);
		if (metadata) return metadata;
	}
};

export const getLocalSolanaMetadata: GetSolanaMetadataFunction = async ({
	mintAddress,
}) => tokenMap[mintAddress];

export const getCachedSolanaMetadata: GetSolanaMetadataFunction = async ({
	storage,
	mintAddress,
}) => {
	const cached = await storage.safeGet<MetadataDocument>(mintAddress);
	const timestamp = new Date(cached?.timestamp || '2000-01-01');
	const cachedTime = new Date().getTime() - timestamp.getTime();

	// invalidate cache after one hour
	if (cachedTime < 60000 * 60 * 24) {
		return cached;
	}
};

export const getRemoteSolanaMetadata: GetSolanaMetadataFunction = async ({
	connection,
	mintAddress,
}) => {
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
