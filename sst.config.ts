import type { SSTConfig } from 'sst';

import document from './tool/stacks/document';
import landing from './tool/stacks/landing';
import { functionDefaults } from './tool/stacks/shared';
import wallet from './tool/stacks/wallet';

export default {
	config() {
		return {
			name: 'walless',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		app.setDefaultFunctionProps(functionDefaults);
		app.stack(document);
		app.stack(landing);
		app.stack(wallet);
	},
} satisfies SSTConfig;
