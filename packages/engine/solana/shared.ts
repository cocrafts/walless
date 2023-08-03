import { PublicKey } from '@solana/web3.js';
import type { LegacyMetadataSource } from '@walless/core';
import { Networks } from '@walless/core';
import type { MetadataDocument } from '@walless/store';

import legacyRegistry from './token-list.json';

export const solMint = '11111111111111111111111111111111';
export const METADATA_PROGRAM_ID =
	'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
export const METADATA_PROGRAM_KEY = new PublicKey(METADATA_PROGRAM_ID);

export const solMetadata: MetadataDocument = {
	_id: solMint,
	type: 'Metadata',
	network: Networks.solana,
	timestamp: new Date().toISOString(),
	name: 'SOL',
	symbol: 'SOL',
	imageUri:
		'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
};

export const tokenMap = (legacyRegistry as LegacyMetadataSource).tokens.reduce(
	(a, i) => {
		a[i.address] = {
			_id: i.address,
			type: 'Metadata',
			network: Networks.solana,
			name: i.name,
			symbol: i.symbol,
			imageUri: i.logoURI,
		} as MetadataDocument;
		return a;
	},
	{} as Record<string, MetadataDocument>,
);
