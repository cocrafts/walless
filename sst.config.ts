import type { SSTConfig } from 'sst';

import Document from './tool/stacks/document';
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
		app.stack(Document);
		app.stack(Extension);
		app.stack(Landing);
	},
} satisfies SSTConfig;
