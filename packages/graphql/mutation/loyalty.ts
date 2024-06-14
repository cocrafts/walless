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
