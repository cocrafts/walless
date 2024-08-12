import { gql } from 'graphql-request';

import { graphql } from '../gen-gql';

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

export const userReferralCodes = graphql(`
	query UserReferralCodes {
		userAccount {
			referralCodes {
				code
				email
			}
			referralRank
		}
	}
`);
