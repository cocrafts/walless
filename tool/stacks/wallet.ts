import type { StackContext } from 'sst/constructs';
import { StaticSite } from 'sst/constructs';

import { appDomainFromStage, hostedZone } from './shared';

export const wallet = ({ stack, app }: StackContext) => {
	const domainName = appDomainFromStage(app.stage);

	const wallet = new StaticSite(stack, 'wallet', {
		path: 'apps/wallet',
		buildOutput: 'metacraft',
		buildCommand: 'yarn build:web',
		customDomain: {
			domainName,
			hostedZone,
		},
	});

	stack.addOutputs({
		url: wallet.url || 'localhost',
		domainName,
	});
};

export default wallet;
