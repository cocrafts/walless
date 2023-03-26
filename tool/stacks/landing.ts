import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import {
	AaaaRecord,
	ARecord,
	HostedZone,
	RecordTarget,
} from 'aws-cdk-lib/aws-route53';
import { CloudFrontTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Bucket, NextjsSite, StackContext } from 'sst/constructs';

const sslArn =
	'arn:aws:acm:us-east-1:984261700405:certificate/c6375953-4ae4-4c6e-8357-38b215aed3a6';

export const Landing = ({ stack, app }: StackContext) => {
	const domain = app.stage === 'production' ? 'walless.io' : 'dev.walless.io';
	const certificate = Certificate.fromCertificateArn(stack, 'w-cert', sslArn);
	const hostedZone = HostedZone.fromLookup(stack, 'HostedZone', {
		domainName: 'walless.io',
	});
	const bucket = new Bucket(stack as never, 'landing-bucket', {
		name: 'walless-landing',
	});
	const site = new NextjsSite(stack as never, 'landing-edge', {
		path: 'apps/landing',
		timeout: '5 seconds',
		memorySize: '2048 MB',
		runtime: 'nodejs18.x',
		bind: [bucket],
		customDomain: {
			domainName: domain,
			cdk: { hostedZone, certificate },
		},
	});

	const recordProps = {
		recordName: domain,
		zone: hostedZone,
		target: RecordTarget.fromAlias(
			new CloudFrontTarget(site.cdk?.distribution as never),
		),
	};

	new ARecord(stack, 'AlternateARecord', recordProps);
	new AaaaRecord(stack, 'AlternateAAAARecord', recordProps);

	site.attachPermissions([bucket]);
	stack.addOutputs({
		url: site.url || 'localhost',
		customDomain: domain,
	});
};

export default Landing;
