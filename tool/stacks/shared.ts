import type { FunctionProps } from 'sst/constructs';

export const hostedZone = 'walless.io';
export const baseDomainName = 'walless.io';

const landingAlias = {
	production: ' ',
	staging: 'staging.',
	development: 'dev.',
};

const appAlias = {
	production: 'app.',
	staging: 'staging.app.',
	development: 'dev.app.',
};

const documentAlias = {
	production: 'docs.',
	staging: 'staging.docs.',
	development: 'dev.docs.',
};

export const landingDomainFromStage = (stage: string) => {
	const prefix = landingAlias[stage] || `${stage}.`;
	return `${prefix.trim()}${baseDomainName}`;
};

export const appDomainFromStage = (stage: string) => {
	const prefix = appAlias[stage] || `app-${stage}.`;
	return `${prefix}${baseDomainName}`;
};

export const appBuildCommandFromStage = (stage: string) => {
	const baseCommand = 'yarn build:web';
	if (stage === 'production') return baseCommand;
	else if (stage === 'staging') return `${baseCommand}:staging`;
	else if (stage === 'development') return `${baseCommand}:dev`;
	else return baseCommand;
};

export const documentDomainFromStage = (stage: string) => {
	const prefix = documentAlias[stage] || `docs-${stage}.`;
	return `${prefix}${baseDomainName}`;
};

export const functionDefaults: Partial<FunctionProps> = {
	runtime: 'nodejs20.x',
	architecture: 'arm_64',
	memorySize: 1024,
};
