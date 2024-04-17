import type { StackContext } from 'sst/constructs';
import { StaticSite } from 'sst/constructs';

import { appDomainFromStage, domainName } from './shared';

export const Extension = ({ stack, app }: StackContext) => {
	const fullDomainName = appDomainFromStage(app.stage);

	const extension = new StaticSite(stack, 'extension', {
		path: 'apps/wallet',
		buildOutput: 'metacraft',
		buildCommand: 'yarn build:all',
		customDomain: {
			domainName: fullDomainName,
			hostedZone: domainName,
		},
	});

	stack.addOutputs({
		extensionUrl: extension.url || 'localhost',
		extensionDomain: fullDomainName,
	});
};

export default Extension;
