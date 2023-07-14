import type { SuiObjectData } from '@mysten/sui.js';
import { Networks } from '@walless/core';
import type { MetadataDocument } from '@walless/store';

export type GetSuiMetadataFunction = (data: SuiObjectData) => MetadataDocument;

export const getSuiMetadata: GetSuiMetadataFunction = (data) => {
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
