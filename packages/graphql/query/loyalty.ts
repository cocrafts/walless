import { gql } from 'graphql-request';

export const loyaltyActiveActions = gql`
	query LoyaltyActiveActions {
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
	query LoyaltyUserProgress {
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

export const loyaltyHistory = gql`
	query LoyaltyHistory {
		loyaltyHistory {
			doneAt
			action {
				category
				cycleInHours
				id
				mechanism
				milestone
				points
				streak
				type
				validFrom
				validUntil
				verifier
				metadata {
					key
					value
				}
			}
			boosts {
				actionId
				id
				multiplier
				points
				validFrom
				validUntil
			}
		}
	}
`;
