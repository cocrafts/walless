import { GraphQLClient } from 'graphql-request';

const endpoint = __DEV__
	? 'https://nerve-stg.walless.io/graphql'
	: 'https://nerve.walless.io/graphql';

export const qlInternals = {
	makeHeaders: () => ({}),
};

export const qlClient = new GraphQLClient(endpoint, {
	errorPolicy: 'all',
	headers: () => qlInternals.makeHeaders(),
});
