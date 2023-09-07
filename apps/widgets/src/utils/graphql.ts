import { GraphQLClient } from 'graphql-request';

export const qlClient = new GraphQLClient(
	process.env.GRAPHQL_ENDPOINT as string,
	{
		errorPolicy: 'all',
	},
);
