import { type TezosToolkit, compose } from '@taquito/taquito';
import { tzip12 } from '@taquito/tzip12';
import { tzip16 } from '@taquito/tzip16';
import { type UnknownObject } from '@walless/core';
import { type MetadataDocument } from '@walless/store';

export type GetTezosMetadataFunction = (
	tokenId: number,
	contractAddress: string,
	tezos: TezosToolkit,
) => Promise<MetadataDocument>;

/**
 * This method might be useful for manual importing token address
 * */
export const getTezosMetadata: GetTezosMetadataFunction = async (
	tokenId,
	contractAddress,
	tezos,
) => {
	const contract = await tezos.contract.at(
		contractAddress,
		compose(tzip12, tzip16),
	);

	const metadata = await contract.tzip12().getTokenMetadata(tokenId);

	return {
		_id: `${contractAddress}/${tokenId}`,
		name: metadata.name,
		symbol: metadata.symbol,
		imageUri: (metadata as UnknownObject)['thumbnailUri'],
		endpoint: tezos.rpc.getRpcUrl(),
		type: 'Metadata',
	};
};
