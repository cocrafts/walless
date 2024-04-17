import type { FunctionProps } from 'sst/constructs';

export const domainName = 'walless.io';

const landingAlias = {
	production: ' ',
	staging: 'stg.',
	development: 'dev.',
};

const appAlias = {
	production: 'app.',
	staging: 'app-stg.',
	development: 'app-dev.',
};

const documentAlias = {
	production: 'docs.',
	staging: 'docs-stg.',
	development: 'docs-dev.',
};

export const landingDomainFromStage = (stage: string) => {
	const prefix = landingAlias[stage] || `${stage}.`;
	return `${prefix.trim()}${domainName}`;
};

export const appDomainFromStage = (stage: string) => {
	const prefix = appAlias[stage] || `app-${stage}.`;
	return `${prefix}${domainName}`;
};

export const documentDomainFromStage = (stage: string) => {
	const prefix = documentAlias[stage] || `docs-${stage}.`;
	return `${prefix}${domainName}`;
};

export const functionDefaults: Partial<FunctionProps> = {
	runtime: 'nodejs20.x',
	architecture: 'arm_64',
	memorySize: 1024,
};
