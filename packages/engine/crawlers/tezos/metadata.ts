import { compose } from '@taquito/taquito';
import { tzip12 } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
import type { MetadataDocument } from '@walless/store';

import type { TezosContext } from './shared';

/**
 * This method might be useful for manual importing token address
 * */
export const getMetadata = async (
	context: TezosContext,
	tokenId: number,
	contractAddress: string,
): Promise<MetadataDocument> => {
	const { connection } = context;
	const contract = await connection.contract.at(
		contractAddress,
		compose(tzip12, tzip16),
	);
	const metadata = await contract.tzip12().getTokenMetadata(tokenId);

	return {
		_id: `${contractAddress}/${tokenId}`,
		name: metadata.name,
		symbol: metadata.symbol,
		imageUri: (metadata as never)['thumbnailUri'],
		endpoint: connection.rpc.getRpcUrl(),
		type: 'Metadata',
	};
};
