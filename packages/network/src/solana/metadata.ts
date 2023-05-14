import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { type Connection, PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { type MetadataDocument } from '@walless/store';

export const METADATA_PROGRAM_ID =
	'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
export const METADATA_PROGRAM_KEY = new PublicKey(METADATA_PROGRAM_ID);

export type GetSolanaMetadataFunction = (
	connection: Connection,
	mintAddress: string,
) => Promise<MetadataDocument>;

export const getSolanaMetadata: GetSolanaMetadataFunction = async (
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
