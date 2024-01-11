import type { Endpoint } from '@walless/core';

import type { Runner } from '../../types';

export type AptosContext = {
	connection: unknown;
};

export const createAptosRunner = (endpoint: Endpoint): Runner => {
	console.log(endpoint);
	return {
		start() {},
		stop() {},
		getContext: (): AptosContext => {
			return {} as AptosContext;
		},
	};
};
