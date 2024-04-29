import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import { documentDomainFromStage, hostedZone } from './shared';

export const document = ({ stack, app }: StackContext) => {
	const domainName = documentDomainFromStage(app.stage);

	const site = new NextjsSite(stack, 'document-edge', {
		path: 'apps/docs',
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

export default document;
