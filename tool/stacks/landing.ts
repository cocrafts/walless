import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { type StackContext, NextjsSite } from 'sst/constructs';

import { landingDomainFromStage } from './shared';

const sslArn =
	'arn:aws:acm:us-east-1:984261700405:certificate/c6375953-4ae4-4c6e-8357-38b215aed3a6';

export const Landing = ({ stack, app }: StackContext) => {
	const domain = landingDomainFromStage(app.stage);
	const certificate = Certificate.fromCertificateArn(stack, 'w-cert', sslArn);
	const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
		domainName: 'walless.io',
	});

	const site = new NextjsSite(stack as never, 'landing-edge', {
		path: 'apps/landing',
		timeout: '5 seconds',
		memorySize: '2048 MB',
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

export default Landing;
