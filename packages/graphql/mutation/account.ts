import { gql } from 'graphql-request';

export const registerAccount = gql`
	mutation RegisterAccount($key: String!) {
		registerAccount(key: $key) {
			identifier
			email
		}
	}
`;

export const registerAccountWithoutKey = gql`
	mutation RegisterAccountWithoutKey {
		registerAccountWithoutKey {
			identifier
			email
		}
	}
`;
