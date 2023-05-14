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
	const result: TokenDocument[] = new Array(data.length);

	for (let i = 0; i < data.length; i += 1) {
		const object = data[i];

		result[i] = {
			_id: `${address}/${object.coinObjectId}`,
			type: 'Token',
			network: Networks.sui,
			endpoint,
			account: {
				mint: object.coinObjectId,
				address,
				balance: object.balance,
				decimals: 9,
			},
			metadata: metadataFetcher(details[i]?.data as never),
		} as TokenDocument;
	}

	return result;
};
