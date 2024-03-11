import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import type { Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import type { TokenMetadata } from '@walless/core';
import { logger } from '@walless/core';
import { METADATA_PROGRAM_ID } from 'utils/constants';

import { throttle } from './internal';
import localMetadata from './local-metadata.json';

export type GetTokenMetadataFunc = (
	connection: Connection,
	mintAddress: string,
) => Promise<TokenMetadata | undefined>;

export const getTokenMetadata: GetTokenMetadataFunc = async (
	connection,
	mintAddress,
) => {
	const fetchers: GetTokenMetadataFunc[] = [getLocalMeta, getRemoteMeta];

	for (const fetcher of fetchers) {
		const result = await fetcher(connection, mintAddress);
		if (result) return result;
	}
};

const getLocalMeta: GetTokenMetadataFunc = async (_, mintAddress) => {
	return localRegistry[mintAddress];
};

const getRemoteMeta: GetTokenMetadataFunc = async (connection, mintAddress) => {
	const result: TokenMetadata = {} as never;
	const mint = new PublicKey(mintAddress);
	const METADATA_PROGRAM_KEY = new PublicKey(METADATA_PROGRAM_ID);
	const [pda] = PublicKey.findProgramAddressSync(
		[Buffer.from('metadata'), METADATA_PROGRAM_KEY.toBuffer(), mint.toBuffer()],
		METADATA_PROGRAM_KEY,
	);
	const info = await throttle(() => connection.getAccountInfo(pda))();
	if (!info?.data) return result;

	const [metadata] = Metadata.deserialize(info.data);
	result.name = metadata.data?.name.replaceAll('\u0000', '');
	result.symbol = metadata.data?.symbol.replaceAll('\u0000', '');

	try {
		const metadataResponse = await fetch(
			metadata.data.uri.replaceAll('\u0000', ''),
			{ method: 'GET' },
		);

		const offChainMetadata = await metadataResponse.json();

		result.image = offChainMetadata.image;
	} catch (error) {
		logger.error('Failed to fetch Solana metadata off-chain', error);
	}

	return result;
};

export const localRegistry: Record<string, TokenMetadata> = {};

interface LegacySolanaMetadata {
	address: string;
	name?: string;
	symbol?: string;
	decimals?: number;
	logoURI?: string;
	extensions?: Record<string, string>;
	tags: string[];
}

interface LegacyMetadataSource {
	name: string;
	logoURI: string;
	keywords: string[];
	timestamp: string;
	tokens: LegacySolanaMetadata[];
}

export const solMetadata: TokenMetadata = {
	name: 'SOL',
	symbol: 'SOL',
	image:
		'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
};

for (const i of (localMetadata as LegacyMetadataSource).tokens) {
	localRegistry[i.address] = {
		name: i.name || 'Unknown',
		symbol: i.symbol || 'Unknown',
		image: i.logoURI || '',
	};
}
