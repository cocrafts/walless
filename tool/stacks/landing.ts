import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import { hostedZone, landingDomainFromStage } from './shared';

export const landing = ({ stack, app }: StackContext) => {
	const domainName = landingDomainFromStage(app.stage);

	const site = new NextjsSite(stack as never, 'landing-edge', {
		path: 'apps/landing',
		edge: true,
		timeout: '5 seconds',
		customDomain: {
			domainName,
			hostedZone,
		},
	});

	stack.addOutputs({
		url: site.url || 'localhost',
		domainName,
	});
};

export default landing;
