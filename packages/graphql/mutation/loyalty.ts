import { gql } from 'graphql-request';

export const performLoyaltyAction = gql`
	mutation performLoyaltyAction($actionId: String!) {
		performLoyaltyAction(actionId: $actionId) {
			actionId
			timestamp
			userId
		}
	}
`;

export const tryToPerformActiveActionsByType = gql`
	mutation tryToPerformActiveActionsByType($type: String!) {
		tryToPerformActiveActionsByType(type: $type) {
			actionId
			timestamp
			userId
		}
	}
`;
