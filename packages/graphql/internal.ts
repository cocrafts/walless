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

export { gql } from 'graphql-request';
