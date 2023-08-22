import { gql } from 'graphql-request';

export const joinWaitlist = gql`
	mutation JoinWaitlist(
		$email: String!
		$twitter: String!
		$description: String!
	) {
		joinWaitlist(email: $email, twitter: $twitter, description: $description) {
			count
			email
			twitter
			description
		}
	}
`;
