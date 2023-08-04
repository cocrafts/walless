import { GraphQLClient } from 'graphql-request';

const endpoint = __DEV__
	? 'https://api-dev.walless.io/light'
	: 'https://api.walless.io/light';

export const qlClient = new GraphQLClient(endpoint, {
	// errorPolicy: 'all',
	// headers: () => {
	// 	return {};
	// },
});

const gotenksEndpoint = __DEV__
	? 'http://localhost:4000/graphql'
	: 'https://api.walless.io/graphql';

export const gotenksClient = new GraphQLClient(gotenksEndpoint, {
	// errorPolicy: 'all',
	// headers: () => {
	// 	return {};
	// },
});

export { gql } from 'graphql-request';
