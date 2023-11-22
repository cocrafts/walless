import { gql } from 'graphql-request';

export const registerDevice = gql`
	mutation RegisterDevice($device: DeviceInfoInput!) {
		registerDevice(device: $device) {
			createdAt
		}
	}
`;
