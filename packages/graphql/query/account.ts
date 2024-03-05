import { gql } from 'graphql-request';

export const userAccount = gql`
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
			referralRank
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
