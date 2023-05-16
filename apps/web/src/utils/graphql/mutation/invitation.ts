import { gql } from 'graphql-request';

export const bindInvitation = gql`
	mutation BindInvitation($code: String!, $email: String!) {
		bindInvitation(code: $code, email: $email)
	}
`;
