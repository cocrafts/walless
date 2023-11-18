import { gql } from 'graphql-request';

export const trackAccountWallets = gql`
	mutation TrackAccountWallets($wallets: [TrackAccountWalletInput]!) {
		trackAccountWallets(wallets: $wallets)
	}
`;
