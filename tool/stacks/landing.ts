import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import { domainName, landingDomainFromStage } from './shared';

export const Landing = ({ stack, app }: StackContext) => {
	const fullDomainName = landingDomainFromStage(app.stage);

	const site = new NextjsSite(stack as never, 'landing-edge', {
		path: 'apps/landing',
		edge: true,
		timeout: '5 seconds',
		customDomain: {
			domainName: fullDomainName,
			hostedZone: domainName,
		},
	});

	stack.addOutputs({
		url: site.url || 'localhost',
		customDomain: fullDomainName,
	});
};

export default Landing;
