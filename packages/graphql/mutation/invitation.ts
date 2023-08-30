import { gql } from 'graphql-request';

export const claimWalletInvitation = gql`
	mutation ClaimWalletInvitation($code: String!, $email: String!) {
		claimWalletInvitation(code: $code, email: $email)
	}
`;
