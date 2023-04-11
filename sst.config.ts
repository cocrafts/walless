import type { SSTConfig } from 'sst';

import Extension from './tool/stacks/extension';
import Landing from './tool/stacks/landing';

export default {
	config(input) {
		return {
			name: input.stage === 'production' ? 'walless' : 'walless-dev',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(Landing);
		app.stack(Extension);
	},
} satisfies SSTConfig;
