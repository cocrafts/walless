import { Networks } from '@walless/core';
import { getSolanaMetadata, GetSolanaMetadataFunction } from '@walless/network';
import { type MetadataDocument } from '@walless/store';
import { db } from 'utils/pouch';

import { type LegacyMetadataSource } from './internal';
import legacyRegistry from './solanaTokenList.json';

export const getLazySolanaMetatadata: GetSolanaMetadataFunction = async (
	connection,
	mintAddress,
) => {
	const local = getLocalMetadata(mintAddress);
	if (local) return local;

	const cached = await db.safeGet<MetadataDocument>(mintAddress);
	const timestamp = new Date(cached?.timestamp || '2000-01-01');
	const cachedTime = new Date().getTime() - timestamp.getTime();
	if (cached && cachedTime < 1) return cached;

	const remote = await getSolanaMetadata(connection, mintAddress);
	await db.upsert(mintAddress, async () => remote);
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
