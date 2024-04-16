import { gql } from 'graphql-request';

export const loyaltyActiveActions = gql`
	query loyaltyActiveActions {
		loyaltyActiveActions {
			category
			cycleInHours
			id
			mechanism
			metadata {
				key
				value
			}
			milestone
			points
			streak
			type
			validFrom
			validUntil
			verifier
		}
	}
`;
