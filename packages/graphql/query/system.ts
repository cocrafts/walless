import { gql } from 'graphql-request';

export const greeting = gql`
	query Greeting {
		greeting
	}
`;

export const system = gql`
	query SystemInfo {
		systemInfo {
			environment
			version
		}
	}
`;
