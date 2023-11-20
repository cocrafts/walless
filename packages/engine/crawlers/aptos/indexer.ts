import { gql, GraphQLClient } from 'graphql-request';

export const getAptosIndexerQl = (network: string) => {
	let url: string;
	switch (network) {
		case 'devnet':
			url = 'https://indexer-devnet.staging.gcp.aptosdev.com/v1/graphql';
			break;
		case 'mainnet':
			url = 'https://indexer.mainnet.aptoslabs.com/v1/graphql';
			break;
		case 'testnet':
			url = 'https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql';
			break;
		default:
			url = 'https://indexer-devnet.staging.gcp.aptosdev.com/v1/graphql';
			break;
	}
	return new GraphQLClient(url, {
		headers: {
			'content-type': 'application/json',
		},
	});
};

export interface QueryPendingNftsResponse {
	current_token_pending_claims: {
		from_address: string;
		to_address: string;
		creator_address: string;
		collection_id: string;
		collection_name: string;
		current_collection_v2: {
			uri: string;
		};
		current_token_data_v2: {
			token_uri: string;
			description: string;
			current_token_ownership: {
				owner_address: string;
			};
		};
		token_data_id: string;
		name: string;
		last_transaction_version: number;
		last_transaction_timestamp: number;
		property_version: number;
		amount: number;
	}[];
}

export const queryPendingNfts = gql`
	query PendingNftsQuery($pubkey: String) {
		current_token_pending_claims(
			where: {
				to_address: { _eq: $pubkey }
				current_token_data_v2: {
					current_token_ownership: { owner_address: { _neq: $pubkey } }
				}
			}
			order_by: { last_transaction_timestamp: desc }
		) {
			from_address
			to_address
			creator_address
			collection_id
			collection_name
			current_collection_v2 {
				uri
			}
			current_token_data_v2 {
				token_uri
				description
				current_token_ownership {
					owner_address
				}
			}
			token_data_id
			name
			last_transaction_version
			last_transaction_timestamp
			property_version
			amount
		}
	}
`;
