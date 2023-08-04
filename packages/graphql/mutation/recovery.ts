import { gql } from 'graphql-request';

export const sendEmergencyKit = gql`
	mutation SendEmergencyKit($key: String!, $receiver: String!) {
		sendEmergencyKit(key: $key, receiver: $receiver) {
			messageId
		}
	}
`;
