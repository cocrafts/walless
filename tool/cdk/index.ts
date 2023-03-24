#!/usr/bin/env node
import { App, Environment } from '@aws-cdk/core';

import 'source-map-support/register';

import { UiGatewayStack } from './uiGateway';

const app = new App();
const env: Environment = { region: 'ap-south-1' };

new UiGatewayStack(app, 'ui-gateways', {
	env,
	stackName: 'ui-gateways',
});
