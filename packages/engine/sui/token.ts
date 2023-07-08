import { type JsonRpcProvider } from '@mysten/sui.js';
import { type Endpoint, Networks } from '@walless/core';
import { type TokenDocument } from '@walless/store';

import { type GetSuiMetadataFunction, getSuiMetadata } from './metadata';

interface TokenByAddressOption {
	endpoint: Endpoint;
	connection: JsonRpcProvider;
	address: string;
	metadataFetcher?: GetSuiMetadataFunction;
}

const suiCoinType = '0x2::sui::SUI';

export const suiTokensByAddress = async ({
	endpoint,
	connection,
	address,
	metadataFetcher = getSuiMetadata,
}: TokenByAddressOption): Promise<TokenDocument[]> => {
	const { data } = await connection.getAllCoins({ owner: address });
	const details = await connection.multiGetObjects({
		ids: data.map((i) => i.coinObjectId),
		options: { showType: true, showDisplay: true },
	});

	if (data.length === 0) {
		data.push({
			balance: '0',
			coinType: suiCoinType,
		} as never);

		details.push({
			data: {
				type: `0x2::coin::Coin<${suiCoinType}>`,
			} as never,
		});
	}

	const result: TokenDocument[] = new Array(data.length);

	for (let i = 0; i < data.length; i += 1) {
		const object = data[i];
		const detail = details[i];

		result[i] = {
			_id: `${address}/${object.coinType}`,
			type: 'Token',
			network: Networks.sui,
			endpoint,
			account: {
				mint: object.coinType,
				address,
				balance: object.balance,
				decimals: 9,
			},
			metadata: metadataFetcher(detail?.data as never),
		} as TokenDocument;
	}

	return result;
};
