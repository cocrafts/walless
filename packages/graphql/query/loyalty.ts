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

export const loyaltyUserProgress = gql`
	query loyaltyUserProgress {
		loyaltyUserProgress {
			id
			totalPoints
			actionRecords {
				actionId
				timestamp
				userId
			}
			trackList {
				cycleInHours
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
