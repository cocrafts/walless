import type { SuiObjectData } from '@mysten/sui.js';
import { Networks } from '@walless/core';
import type { MetadataDocument } from '@walless/store';

import type { SuiContext } from './shared';

export const getMetadata = async (
	_: SuiContext,
	data: SuiObjectData,
): Promise<MetadataDocument> => {
	const result: MetadataDocument = {
		_id: data.objectId,
		type: 'Metadata',
		network: Networks.sui,
		timestamp: new Date().toISOString(),
	};

	if (data.type === '0x2::coin::Coin<0x2::sui::SUI>') {
		result.name = 'Sui';
		result.symbol = 'SUI';
		result.imageUri = '/img/network/sui-icon.png';
	} else {
		result.name = 'unknown';
		result.symbol = 'unknown';
		result.imageUri = undefined;
		result.sod = data;
	}

	return result;
};
