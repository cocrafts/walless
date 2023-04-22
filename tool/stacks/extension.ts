import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { StackContext, StaticSite } from 'sst/constructs';

import { appDomainFromStage } from './shared';

const sslArn =
	'arn:aws:acm:us-east-1:984261700405:certificate/c6375953-4ae4-4c6e-8357-38b215aed3a6';

export const Extension = ({ stack, app }: StackContext) => {
	const domain = appDomainFromStage(app.stage);
	const certificate = Certificate.fromCertificateArn(stack, 'w-cert', sslArn);
	const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
		domainName: 'walless.io',
	});

	const extension = new StaticSite(stack, 'extension', {
		path: 'apps/web',
		buildOutput: 'metacraft',
		buildCommand: 'yarn build',
		customDomain: {
			domainName: domain,
			cdk: { hostedZone, certificate },
		},
	});

	stack.addOutputs({
		extensionUrl: extension.url || 'localhost',
		extensionDomain: domain,
	});
};

export default Extension;
