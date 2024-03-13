import type { CoinStruct, SuiClient } from '@mysten/sui.js/client';
import type { TokenMetadata } from '@walless/core';

import metadata from './metadata.json';

type GetMetadataFunc = (
	coinType: string,
	client?: SuiClient,
) => Promise<TokenMetadata | undefined>;

export const getSUITokenMetadata = async (
	client: SuiClient,
	coin: CoinStruct,
): Promise<TokenMetadata | undefined> => {
	const fetchers: GetMetadataFunc[] = [getLocalMetadata, getOnChainMetadata];

	for (const fetcher of fetchers) {
		const result = await fetcher(coin.coinType, client);
		if (result) return result;
	}
};

const getOnChainMetadata: GetMetadataFunc = async (coinType, client) => {
	if (!client) return;

	const coinMetadata = await client.getCoinMetadata({ coinType });

	return {
		name: coinMetadata?.name || 'Unknown',
		symbol: coinMetadata?.symbol || 'Unknown',
		image: coinMetadata?.iconUrl || '',
	};
};

const getLocalMetadata: GetMetadataFunc = async (coinType: string) => {
	const metadata = localMetadataRegistry[coinType];
	if (!metadata) return;

	return {
		name: metadata.name,
		symbol: metadata.symbol,
		image: metadata.icon_url,
	};
};

const localMetadataRegistry: Record<string, LocalMetadata> = {};

interface LocalMetadata {
	name: string;
	symbol: string;
	coin_type: string;
	coingecko_id: string;
	decimals: number;
	icon_url: string;
	project_url: string;
	source: string;
}

for (const i of metadata as LocalMetadata[]) {
	localMetadataRegistry[i.coin_type] = i;
}
