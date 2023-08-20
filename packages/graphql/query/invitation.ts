import { gql } from 'graphql-request';

export const walletInvitation = gql`
	query walletInvitation($code: String, $email: String) {
		walletInvitation(code: $code, email: $email) {
			code
			email
		}
	}
`;
