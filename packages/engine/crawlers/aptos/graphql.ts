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

export const queryPendingNfts = gql`
	query PendingNftsQuery($pubkey: String) {
		current_token_pending_claims(
			where: { to_address: { _eq: $pubkey } }
			order_by: { last_transaction_timestamp: asc }
		) {
			from_address
			to_address
			creator_address
			collection_id
			collection_name
			token_data_id
			name
			last_transaction_version
			last_transaction_timestamp
			property_version
			amount
		}
	}
`;
