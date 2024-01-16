import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import type { Connection } from '@solana/web3.js';
import { PublicKey } from '@solana/web3.js';
import { logger, Networks } from '@walless/core';
import type { MetadataDocument } from '@walless/store';
import { METADATA_PROGRAM_ID, solMint } from 'utils/constants';
import { storage } from 'utils/storage';

import localMetadata from './local-metadata.json';
import { throttle } from './utils';

export type GetMetadataFunc = (
	connection: Connection,
	mintAddress: string,
) => Promise<MetadataDocument | undefined>;

export const getMetadata: GetMetadataFunc = async (connection, mintAddress) => {
	const fetchers: GetMetadataFunc[] = [
		getLocalMeta,
		getCachedMeta,
		getRemoteMeta,
	];

	for (const fetcher of fetchers) {
		const result = await fetcher(connection, mintAddress);
		if (result) return result;
	}
};

const getLocalMeta: GetMetadataFunc = async (_, mintAddress) => {
	return localRegistry[mintAddress];
};

const getCachedMeta: GetMetadataFunc = async (_, mintAddress) => {
	const cached = await storage.safeGet<MetadataDocument>(mintAddress);
	const timestamp = new Date(cached?.timestamp || '2000-01-01');
	const cachedTime = new Date().getTime() - timestamp.getTime();
	const cacheTimeout = 60000 * 60 * 24; // one day cache

	if (cachedTime < cacheTimeout) {
		return cached;
	}
};

const getRemoteMeta: GetMetadataFunc = async (connection, mintAddress) => {
	const result: MetadataDocument = {
		_id: mintAddress,
		type: 'Metadata',
		network: Networks.solana,
		timestamp: new Date().toISOString(),
	};
	const mint = new PublicKey(mintAddress);
	const METADATA_PROGRAM_KEY = new PublicKey(METADATA_PROGRAM_ID);
	const [pda] = PublicKey.findProgramAddressSync(
		[Buffer.from('metadata'), METADATA_PROGRAM_KEY.toBuffer(), mint.toBuffer()],
		METADATA_PROGRAM_KEY,
	);
	const info = await throttle(() => connection.getAccountInfo(pda))();
	if (!info?.data) return result;

	const [metadata] = Metadata.deserialize(info.data);
	result.name = metadata.data?.name;
	result.symbol = metadata.data?.symbol;
	result.mpl = metadata;

	try {
		const metadataResponse = await fetch(
			metadata.data.uri.replaceAll('\u0000', ''),
			{ method: 'GET' },
		);

		const offChainMetadata = await metadataResponse.json();

		result.imageUri = offChainMetadata.image;
	} catch (error) {
		logger.error('Failed to fetch Solana metadata off-chain', error);
	}

	return result;
};

export const localRegistry: Record<string, MetadataDocument> = {};

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

export const solMetadata: MetadataDocument = {
	_id: solMint,
	type: 'Metadata',
	network: Networks.solana,
	name: 'SOL',
	symbol: 'SOL',
	imageUri:
		'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
};

for (const i of (localMetadata as LegacyMetadataSource).tokens) {
	localRegistry[i.address] = {
		_id: i.address,
		type: 'Metadata',
		network: Networks.solana,
		name: i.name,
		symbol: i.symbol,
		imageUri: i.logoURI,
	};
}

localRegistry[solMint] = solMetadata;
