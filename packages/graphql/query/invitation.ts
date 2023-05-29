import { gql } from 'graphql-request';

export const invitationCode = gql`
	query invitationCode($code: String!) {
		invitationCode(code: $code) {
			pk
			email
			timestamp
		}
	}
`;

export const invitationAccount = gql`
	query invitationAccount($email: String!) {
		invitationAccount(email: $email) {
			pk
		}
	}
`;
