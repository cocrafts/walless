import { gql } from 'graphql-request';

export const doLoyaltyAction = gql`
	mutation doLoyaltyAction($actionId: String!) {
		doLoyaltyAction(actionId: $actionId) {
			actionId
			timestamp
			userId
		}
	}
`;

export const doRecurringThenStreakThenMilestoneActionsByType = gql`
	mutation DoRecurringThenStreakThenMilestoneActionsByType($type: String!) {
		doRecurringThenStreakThenMilestoneActionsByType(type: $type) {
			actionId
			timestamp
			userId
		}
	}
`;
