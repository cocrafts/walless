import type { JsonMetadata } from '@metaplex-foundation/js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { PublicKey } from '@solana/web3.js';
import { Networks } from '@walless/core';
import { modules } from '@walless/ioc';
import type { MetadataDocument } from '@walless/store';

import localMetadata from './local-metadata.json';
import type { SolanaContext } from './shared';
import { throttle } from './shared';

export type GetMetadataFunc = (
	context: SolanaContext,
	mintAddress: string,
) => Promise<MetadataDocument | undefined>;

export const getMetadata: GetMetadataFunc = async (context, mintAddress) => {
	const fetchers: GetMetadataFunc[] = [
		getLocalMeta,
		getCachedMeta,
		getRemoteMeta,
	];

	for (const fetcher of fetchers) {
		const result = await fetcher(context, mintAddress);
		if (result) return result;
	}
};

const getLocalMeta: GetMetadataFunc = async (_, mintAddress) => {
	return localRegistry[mintAddress];
};

const getCachedMeta: GetMetadataFunc = async (_, mintAddress) => {
	const cached = await modules.storage.safeGet<MetadataDocument>(mintAddress);
	const timestamp = new Date(cached?.timestamp || '2000-01-01');
	const cachedTime = new Date().getTime() - timestamp.getTime();
	const cacheTimeout = 60000 * 60 * 24; // one day cache

	if (cachedTime < cacheTimeout) {
		return cached;
	}
};

const getRemoteMeta: GetMetadataFunc = async ({ connection }, mintAddress) => {
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
	const info = await throttle(() => connection.getAccountInfo(pda))();
	if (!info?.data) return result;

	const [metadata] = Metadata.deserialize(info.data);
	result.name = metadata.data?.name;
	result.symbol = metadata.data?.symbol;
	result.mpl = metadata;

	try {
		const offChainMetadata = (await fetch(metadata.data.uri, {
			method: 'GET',
		}).then((res) => res.json())) as JsonMetadata;

		result.imageUri = offChainMetadata.image;
	} catch {
		console.log('failed to fetch Solana metadata from off-chain source');
	}

	return result;
};

export const localRegistry: Record<string, MetadataDocument> = {};
export const solMint = '11111111111111111111111111111111';
export const METADATA_PROGRAM_ID =
	'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
export const METADATA_PROGRAM_KEY = new PublicKey(METADATA_PROGRAM_ID);

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
