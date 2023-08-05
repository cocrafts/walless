import { gql } from 'graphql-request';

export const sendEmergencyKit = gql`
	mutation SendEmergencyKit($key: String!) {
		sendEmergencyKit(key: $key) {
			messageId
		}
	}
`;
