import type { HexString, Provider } from 'aptos';

import type { AptosPendingToken, AptosToken } from '../../state/aptos';

import type { QueryPendingNftsResponse } from './indexer';
import { getAptosIndexerQl, queryPendingNfts } from './indexer';

export const getPendingTokens = async (endpoint: string, pubkey: HexString) => {
	const qlClient = getAptosIndexerQl(endpoint);
	const pendingNftsRes: QueryPendingNftsResponse = await qlClient.request(
		queryPendingNfts,
		{
			pubkey: pubkey.toString(),
		},
	);
	const pendingNfts: AptosPendingToken[] =
		pendingNftsRes.current_token_pending_claims
			.map((token) => {
				return {
					fromAddress: token.from_address,
					toAddress: token.to_address,
					creatorAddress: token.creator_address,
					ownerAddress:
						token.current_token_data_v2.current_token_ownership.owner_address,
					collectionId: token.collection_id,
					collectionName: token.collection_name,
					collectionUri: token.current_collection_v2.uri,
					tokenDataId: token.token_data_id,
					name: token.name,
					description: token.current_token_data_v2.description,
					uri: token.current_token_data_v2.token_uri,
					lastTransactionVersion: token.last_transaction_version,
					lastTransactionTimestamp: token.last_transaction_timestamp,
					propertyVersion: token.property_version,
					amount: token.amount,
				};
			})
			.filter((token) => token.toAddress !== token.ownerAddress);
	return pendingNfts;
};

export const getOwnedTokens = async (
	connection: Provider,
	pubkey: HexString,
) => {
	const ownedTokensRes = await connection.getOwnedTokens(pubkey);
	const ownedTokens: AptosToken[] =
		ownedTokensRes.current_token_ownerships_v2.map((token) => {
			return {
				creatorAddress:
					token.current_token_data?.current_collection?.creator_address ?? '',
				ownerAddress: token.owner_address,
				collectionId: token.current_token_data?.collection_id ?? '',
				collectionName:
					token.current_token_data?.current_collection?.collection_name ?? '',
				collectionUri: token.current_token_data?.current_collection?.uri ?? '',
				tokenDataId: token.token_data_id,
				name: token.current_token_data?.token_name ?? '',
				description: token.current_token_data?.description ?? '',
				uri: token.current_token_data?.token_uri ?? '',
				amount: token.amount,
				lastTransactionTimestamp: token.last_transaction_timestamp,
				lastTransactionVersion: token.last_transaction_version,
				propertyVersion: token.property_version_v1,
			};
		});
	return ownedTokens;
};