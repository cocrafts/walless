import { GraphQLClient } from 'graphql-request';

const localEndpoint = 'http://localhost:8080/graphql';

export const qlClient = new GraphQLClient(
	// process.env.GRAPHQL_ENDPOINT as string,
	localEndpoint,
	{
		errorPolicy: 'all',
	},
);
