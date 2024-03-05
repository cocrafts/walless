import { gql } from 'graphql-request';

export const walletInvitation = gql`
	query walletInvitation($code: String, $email: String) {
		walletInvitation(code: $code, email: $email) {
			code
			email
		}
	}
`;

export const referralLeaderboard = gql`
	query referralLeaderboard {
		referralLeaderboard {
			accountId
			displayName
			id
			rank
			rankChange
			referralCount
		}
	}
`;
