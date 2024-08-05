import { graphql } from '../gen-gql/';

export const loyaltyActiveTasks = graphql(`
	query LoyaltyActiveTasks {
		loyaltyActiveTasks {
			endDate
			id
			interval
			mechanism
			metadata
			milestone
			points
			recurringId
			startDate
			streak
			type
			verifierKeys
			version
		}
	}
`);

export const loyaltyProfile = graphql(`
	query LoyaltyProfile {
		loyaltyProfile {
			id
			identifier
			totalPoints
			recurringStatusList {
				currentStreak
				recentTrackAt
				taskId
				total
			}
		}
	}
`);
