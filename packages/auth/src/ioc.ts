import type { GraphQLClient } from 'graphql-request';

import type { TypedThresholdKey } from './w3a';

export interface DynamicAuthModules {
	key: TypedThresholdKey;
	qlClient: GraphQLClient;
}

export interface DynamicAuthConfig {
	w3aId: string;
	w3aBaseUrl: string;
}

export const injectedModules = {} as DynamicAuthModules;
export const injectedConfig = {} as DynamicAuthConfig;
