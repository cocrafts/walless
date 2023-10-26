import type { HexString, Provider } from 'aptos';

import type { AptosPendingToken } from '../../state/aptos';

import { Networks } from '@walless/core';
import { collectibleState, collectionState } from '../../state/collectible';
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

export const constructAptosTokens = async (
	connection: Provider,
	pubkey: HexString,
) => {
	const ownedTokensRes = await connection.getOwnedTokens(pubkey);

	// NOTE: it is better to have a deep comparison here
	const aptosCollectibleQuantity = Array.from(
		collectibleState.map.values(),
	).reduce((sum, collectible) => {
		if (collectible.network === Networks.aptos) {
			sum += collectible.account.amount;
		}
		return sum;
	}, 0);
	if (
		aptosCollectibleQuantity ===
		ownedTokensRes.current_token_ownerships_v2.length
	) {
		return;
	}

	ownedTokensRes.current_token_ownerships_v2.forEach((token) => {
		const collectionId = `${pubkey.toShortString()}/${
			token.current_token_data?.collection_id ?? ''
		}`;
		const collection = collectionState.map.get(collectionId);
		if (!collection) {
			collectionState.map.set(collectionId, {
				_id: collectionId,
				type: 'Collection',
				network: Networks.aptos,
				metadata: {
					name: token.current_token_data?.current_collection?.collection_name,
					description:
						token.current_token_data?.current_collection?.description,
					imageUri: token.current_token_data?.token_uri,
					symbol: token.current_token_data?.current_collection?.collection_name,
				},
				count: 1,
			});
		} else {
			collection.count += 1;
		}
		const collectibleId = `${pubkey.toShortString()}/${token.token_data_id}`;
		let attributes = token.current_token_data?.token_properties;
		if (typeof attributes === 'object') {
			attributes = Object.entries(attributes).map(([key, value]) => ({
				key,
				value,
			}));
		}
		collectibleState.map.set(collectibleId, {
			_id: collectibleId,
			type: 'NFT',
			collectionId,
			network: Networks.aptos,
			metadata: {
				name: token.current_token_data?.token_name ?? '',
				description: token.current_token_data?.description ?? '',
				imageUri: token.current_token_data?.token_uri ?? '',
				symbol: token.current_token_data?.token_name ?? '',
				attributes,
			},
			account: {
				owner: token.owner_address,
				mint: token.token_data_id,
				amount: token.amount,
			},
		});
	});
};
