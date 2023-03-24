import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';
import { Code, Function } from '@aws-cdk/aws-lambda';
import { Construct, Stack, StackProps } from '@aws-cdk/core';

import { nodeFunctionProps } from './shared';

export class UiGatewayStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		const landingFunction = new Function(this, 'walless-landing-function', {
			...nodeFunctionProps,
			functionName: 'walless-landing',
			code: Code.fromAsset('apps/home/metacraft'),
		});

		const landingIntegration = new LambdaIntegration(landingFunction);
		const landingApi = new RestApi(this, 'landing-api', {
			description: 'Walless SSR api for landing page',
		});

		landingApi.root.addMethod('GET', landingIntegration);
	}
}
