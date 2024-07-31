import { gql } from 'graphql-request';

export const tokenById = gql`
	query TokenById($id: String!) {
		token(id: $id) {
			id
			address
			name
			quotes
			pnl {
				currentPrice
			}
		}
	}
`;

export const tokenByAddress = gql`
	query TokenByAddress($address: String!) {
		tokenByAddress(address: $address) {
			id
			address
			name
			quotes
			pnl {
				currentPrice
			}
		}
	}
`;

export const tokensByAddress = gql`
	query TokensByAddress($addresses: [String!]!) {
		tokensByAddress(addresses: $addresses) {
			id
			address
			name
			quotes
			pnl {
				currentPrice
			}
		}
	}
`;
