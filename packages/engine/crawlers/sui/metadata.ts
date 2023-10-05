import { Networks } from '@walless/core';
import type { MetadataDocument } from '@walless/store';

import type { ICoin, SuiContext } from './shared';
import suietMetadata from './suiet-metadata.json';

type GetMetadataFunc = (
	coinType: string,
	context?: SuiContext,
) => Promise<MetadataDocument | undefined>;

export const getMetadata = async (
	context: SuiContext,
	coin: ICoin,
): Promise<MetadataDocument | undefined> => {
	const fetchers: GetMetadataFunc[] = [getSuietMetadata, getOnChainMetadata];

	for (const fetcher of fetchers) {
		const result = await fetcher(coin.coinType, context);
		if (result) return { ...result, timestamp: new Date().toISOString() };
	}
};

const getOnChainMetadata: GetMetadataFunc = async (coinType, context) => {
	const coinMetadata = await context?.connection.getCoinMetadata({ coinType });

	return {
		_id: coinType,
		type: 'Metadata',
		network: Networks.sui,
		name: coinMetadata?.name,
		symbol: coinMetadata?.symbol,
		imageUri: coinMetadata?.iconUrl,
	} as MetadataDocument;
};

const getSuietMetadata = async (coinType: string) => {
	return suietRegistry[coinType];
};

const suietRegistry: Record<string, MetadataDocument> = {};

interface SuietMetadata {
	name: string;
	symbol: string;
	coin_type: string;
	coingecko_id: string;
	decimals: number;
	icon_url: string;
	project_url: string;
	source: string;
}

for (const i of suietMetadata as SuietMetadata[]) {
	suietRegistry[i.coin_type] = {
		_id: i.coin_type,
		type: 'Metadata',
		network: Networks.sui,
		name: i.name,
		symbol: i.symbol,
		imageUri: i.icon_url,
	};
}
