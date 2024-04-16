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

export const loyaltyProgress = gql`
	query loyaltyProgress {
		loyaltyProgress {
			id
			totalPoints
			records {
				actionId
				timestamp
				userId
			}
			trackList {
				lastClaim
				milestone
				type
				streaks {
					currentStreak
					remainingClaims
					streak
				}
			}
		}
	}
`;
