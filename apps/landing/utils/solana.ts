import { LegacySolanaMetadata, Networks } from '@walless/core';
import {
	type GetSolanaMetadataFunction,
	GetNftCollections,
	getNftCollections,
	getSolanaMetadata,
} from '@walless/network';
import { MetadataDocument } from '@walless/store';

import legacyRegistry from './solanaTokenList.json';

interface LegacyMetadataSource {
	name: string;
	logoURI: string;
	keywords: string[];
	timestamp: string;
	tokens: LegacySolanaMetadata[];
}

export const getLazySolanaMetatadata: GetSolanaMetadataFunction = async (
	connection,
	mintAddress,
) => {
	const local = getLocalMetadata(mintAddress);
	if (local) return local;

	const remote = await getSolanaMetadata(connection, mintAddress);
	return remote;
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

export const getLocalMetadata = (address: string) => {
	return tokenMap[address];
};

export const getSolanaNftCollection: GetNftCollections = async (
	connection,
	mintAddress,
) => {
	return await getNftCollections(connection, mintAddress);
};
