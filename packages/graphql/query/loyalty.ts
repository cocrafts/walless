import { graphql } from '../gen-gql/';

export const loyaltyTask = graphql(`
	query LoyaltyTask($id: String!) {
		loyaltyTask(id: $id) {
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
	query LoyaltyProfile($first: Int!, $after: String!) {
		loyaltyProfile {
			id
			identifier
			totalPoints
			history(first: $first, after: $after) {
				totalCount
				edges {
					cursor
					node {
						id
						profileId
						taskId
						taskVersion
						timestamp
					}
				}
				pageInfo {
					endCursor
					hasNextPage
				}
			}
			recurringStatusList {
				currentStreak
				recentTrackAt
				interval
				taskId
				total
			}
		}
	}
`);
