import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import type { StackContext } from 'sst/constructs';
import { StaticSite } from 'sst/constructs';

import { appDomainFromStage, sslArn } from './shared';

export const Extension = ({ stack, app }: StackContext) => {
	const domain = appDomainFromStage(app.stage);
	const certificate = Certificate.fromCertificateArn(stack, 'w-cert', sslArn);
	const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
		domainName: 'walless.io',
	});

	const extension = new StaticSite(stack, 'extension', {
		path: 'apps/web',
		edge: true,
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
