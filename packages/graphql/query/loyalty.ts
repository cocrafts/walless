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

export const loyaltyTaskRecords = graphql(`
	query LoyaltyTaskRecords($taskId: String!) {
		loyaltyTaskRecords(taskId: $taskId) {
			id
			profileId
			taskId
			taskVersion
			timestamp
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

export const loyaltyPartners = graphql(`
	query LoyaltyPartners {
		loyaltyPartners {
			coverImage
			desc
			endDate
			id
			logo
			name
			startDate
			socialList {
				link
				platform
			}
		}
	}
`);
