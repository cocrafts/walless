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

export const userReferralCodes = gql`
	query UserAccount {
		userAccount {
			id
			email
			identifier
			referralCodes {
				code
				email
				id
			}
		}
	}
`;
