import { Architecture, FunctionProps, Runtime } from '@aws-cdk/aws-lambda';

const environment = {
	REDIS_SECRET: process.env.REDIS_SECRET,
} as never;

export const nodeFunctionProps: Omit<FunctionProps, 'code'> = {
	runtime: Runtime.NODEJS_16_X,
	memorySize: 512,
	architecture: Architecture.ARM_64,
	handler: 'index.handler',
	environment,
};

export const rustFunctionProps: Omit<FunctionProps, 'code'> = {
	runtime: Runtime.PROVIDED_AL2,
	memorySize: 128,
	architecture: Architecture.ARM_64,
	handler: 'bootstrap',
	environment,
};

export const sslArn = process.env.SSL_ARN;
export const googleSignInId = process.env.GOOGLE_CLIENT_ID;
export const googleSignInSecret = process.env.GOOGLE_CLIENT_SECRET;
