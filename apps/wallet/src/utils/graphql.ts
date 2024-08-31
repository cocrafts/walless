import { GraphQLClient } from 'graphql-request';

import { environment } from './config';
import { fireCache } from './firebase';

export const qlClient = new GraphQLClient(
	environment.GRAPHQL_ENDPOINT as string,
	{
		errorPolicy: 'all',
		headers: () => {
			const headers: Record<string, string> = {};

			if (fireCache.idToken) {
				headers['Authorization'] = `Bearer ${fireCache.idToken}`;
			}

			return headers;
		},
	},
);

// https://www.npmjs.com/package/graphql-request
// `errorPolicy: 'none'`: Allow no errors at all. If you receive a GraphQL error the client will throw.
export const qlClientThatThrowError = new GraphQLClient(
	environment.GRAPHQL_ENDPOINT as string,
	{
		errorPolicy: 'none',
		headers: () => {
			const headers: Record<string, string> = {};

			if (fireCache.idToken) {
				headers['Authorization'] = `Bearer ${fireCache.idToken}`;
			}

			return headers;
		},
	},
);
