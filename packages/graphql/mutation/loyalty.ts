import { graphql } from '../gen-gql';

export const doLoyaltyTask = graphql(`
	mutation DoLoyaltyTask($id: String!) {
		doLoyaltyTask(id: $id) {
			id
			profileId
			taskId
			taskVersion
			timestamp
		}
	}
`);

export const doLoyaltyTasksByRecurringGroup = graphql(`
	mutation DoLoyaltyTasksByRecurringGroup($id: String!) {
		doLoyaltyTasksByRecurringGroup(id: $id) {
			id
			profileId
			taskId
			taskVersion
			timestamp
		}
	}
`);
