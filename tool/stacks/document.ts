import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import { documentDomainFromStage, domainName } from './shared';

export const Document = ({ stack, app }: StackContext) => {
	const fullDomainName = documentDomainFromStage(app.stage);

	const site = new NextjsSite(stack, 'document-edge', {
		path: 'apps/docs',
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

export default Document;
