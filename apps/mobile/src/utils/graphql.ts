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
