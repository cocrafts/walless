import { gql } from 'graphql-request';

export const registerAccount = gql`
	mutation RegisterAccount($key: String!) {
		registerAccount(key: $key) {
			identifier
			email
		}
	}
`;

export const registerAccountWithoutSendingEmergencyKit = gql`
	mutation RegisterAccountWithoutSendingEmergencyKit($key: String) {
		registerAccountWithoutSendingEmergencyKit(key: $key) {
			identifier
			email
		}
	}
`;
