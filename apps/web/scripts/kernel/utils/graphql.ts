import { GraphQLClient } from 'graphql-request';

export const qlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
	errorPolicy: 'all',
});
