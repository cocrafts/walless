import type { SSTConfig } from 'sst';

import Extension from './tool/stacks/extension';
import Landing from './tool/stacks/landing';

export default {
	config() {
		return {
			name: 'walless',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.stack(Landing);
		app.stack(Extension);
	},
} satisfies SSTConfig;
