import type { SuiClient } from '@mysten/sui.js/client';
import { Networks } from '@walless/core';
import type { TokenDocument } from '@walless/store';

import { getSuiMetadata } from './metadata';

export const getSuiTokensByAddress = async (
	suiClient: SuiClient,
	address: string,
): Promise<TokenDocument[]> => {
	const { data } = await suiClient.getAllCoins({ owner: address });
	const details = await suiClient.multiGetObjects({
		ids: data.map((i) => i.coinObjectId),
		options: { showType: true, showDisplay: true },
	});
	const result: TokenDocument[] = new Array(data.length);

	for (let i = 0; i < data.length; i += 1) {
		const object = data[i];

		result[i] = {
			_id: `${address}/token/${object.coinObjectId}`,
			type: 'Token',
			network: Networks.sui,
			account: {
				owner: address,
				mint: object.coinObjectId,
				address,
				balance: object.balance,
				decimals: 9,
			},
			metadata: getSuiMetadata(details[i]?.data as never),
		} as TokenDocument;
	}

	return result;
};
