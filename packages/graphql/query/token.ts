import { gql } from 'graphql-request';

export const tokensByAddress = gql`
	query TokensByAddress($addresses: [String!]!) {
		tokensByAddress(addresses: $addresses) {
			id
			address
			name
			quotes
		}
	}
`;

export const tokenById = gql`
	query TokenById($id: String!) {
		token(id: $id) {
			id
			address
			name
			quotes
		}
	}
`;
