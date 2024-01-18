import { gql } from 'graphql-request';

export const referralLeaderboard = gql`
	query ReferralLeaderboard {
		referralLeaderboard {
			display
			id
			rank
			rankChange
			referralCount
		}
	}
`;
