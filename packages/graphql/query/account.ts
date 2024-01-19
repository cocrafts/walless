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
		}
	}
`;

export const userAccountReferral = gql`
	query UserAccountReferral {
		userAccount {
			id
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
