import { Networks } from '@walless/core';
import type { MetadataDocument } from '@walless/store';

import type { ICoin, SuiContext } from './shared';
import suietMetadata from './suiet-metadata.json';

export const getMetadata = async (
	_: SuiContext,
	coin: ICoin,
): Promise<MetadataDocument> => {
	const meta = suietRegistry[coin.coinType];

	const result: MetadataDocument = {
		_id: coin.coinType,
		type: 'Metadata',
		network: Networks.sui,
		name: meta?.name || 'unknown',
		symbol: meta?.symbol || 'unknown',
		imageUri: meta?.imageUri || 'unknown',
		timestamp: new Date().toISOString(),
	};

	return result;
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
