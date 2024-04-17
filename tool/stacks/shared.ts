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
	development: 'docs-stg.',
};

export const sslArn =
	'arn:aws:acm:us-east-1:984261700405:certificate/62eebd95-add3-42cc-bcb1-4b6926c0ef13';

export const landingDomainFromStage = (stage: string) => {
	const prefix = landingAlias[stage] || `${stage}.`;
	return `${prefix.trim()}walless.io`;
};

export const appDomainFromStage = (stage: string) => {
	const prefix = appAlias[stage] || `app-${stage}.`;
	return `${prefix}walless.io`;
};

export const documentDomainFromStage = (stage: string) => {
	const prefix = documentAlias[stage] || `docs-${stage}.`;
	return `${prefix}walless.io`;
};
