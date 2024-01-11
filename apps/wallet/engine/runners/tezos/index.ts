import type { Endpoint } from '@walless/core';

import type { Runner } from '../../types';

export type TezosContext = {
	connection: unknown;
};

export const createTezosRunner = (endpoint: Endpoint): Runner => {
	console.log(endpoint);
	return {
		start() {},
		stop() {},
		getContext: (): TezosContext => {
			return {} as TezosContext;
		},
	};
};
