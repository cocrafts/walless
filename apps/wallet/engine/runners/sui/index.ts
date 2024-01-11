import type { Endpoint } from '@walless/core';

import type { Runner } from '../../types';

export type suiContext = {
	connection: unknown;
};

export const createSuiRunner = (endpoint: Endpoint): Runner => {
	console.log(endpoint);
	return {
		start() {},
		stop() {},
		getContext: (): suiContext => {
			return {} as suiContext;
		},
	};
};
