import type { SSTConfig } from 'sst';

import Landing from './tool/stacks/landing';

export default {
	config(input) {
		return {
			name: input.stage === 'prod' ? 'walless' : 'walless-dev',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(Landing);
	},
} satisfies SSTConfig;
