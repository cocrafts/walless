import { gql } from 'graphql-request';

export const walletInvitation = gql`
	query walletInvitation($code: String, $email: String) {
		walletInvitation(code: $code, email: $email) {
			code
			email
		}
	}
`;

export const claimedInvitations = gql`
	query claimedWalletInvitations {
		claimedWalletInvitations {
			code
			email
			id
			referrerId
			timestamp
		}
	}
`;

export const unclaimedInvitations = gql`
	query unclaimedWalletInvitations {
		unclaimedWalletInvitations {
			code
			email
			id
			referrerId
			timestamp
		}
	}
`;

export const referralLeaderboard = gql`
	query referralLeaderboard {
		referralLeaderboard {
			display
			id
			rank
			rankChange
			referralCount
		}
	}
`;
