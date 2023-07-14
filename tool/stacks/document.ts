import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

import { documentDomainFromStage, sslArn } from './shared';

export const Document = ({ stack, app }: StackContext) => {
	const domain = documentDomainFromStage(app.stage);
	const certificate = Certificate.fromCertificateArn(stack, 'w-cert', sslArn);
	const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
		domainName: 'walless.io',
	});

	const site = new NextjsSite(stack, 'document-edge', {
		path: 'apps/docs',
		edge: true,
		timeout: '5 seconds',
		memorySize: '1024 MB',
		runtime: 'nodejs18.x',
		customDomain: {
			domainName: domain,
			cdk: { hostedZone, certificate },
		},
	});

	stack.addOutputs({
		url: site.url || 'localhost',
		customDomain: domain,
	});
};

export default Document;
