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
	query referralLeaderboard($limit: Int, $offset: Int) {
		referralLeaderboard(limit: $limit, offset: $offset) {
			accountId
			displayName
			id
			rank
			rankChange
			referralCount
		}
	}
`;

export const referralLeaderboardSize = gql`
	query referralLeaderboardSize {
		referralLeaderboardSize
	}
`;
