import { gql } from 'graphql-request';

export const userAccount = gql`
	query UserAccount {
		userAccount {
			id
			email
			identifier
			walletCount
			createdAt
			updatedAt
			claimedReferrals {
				code
				email
				id
				referrerId
				timestamp
			}
			unclaimedReferrals {
				code
				email
				id
				referrerId
				timestamp
			}
		}
	}
`;
