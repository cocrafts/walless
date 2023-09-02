import type { GraphQLClient } from 'graphql-request';

import type { TypedThresholdKey } from './w3a';

export interface DynamicAuthModules {
	key: TypedThresholdKey;
	qlClient: GraphQLClient;
}

export const injectedModules = {} as DynamicAuthModules;
