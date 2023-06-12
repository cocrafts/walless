const landingAlias = {
	production: ' ',
	staging: 'stg.',
	development: 'dev.',
};

const appAlias = {
	production: 'app.',
	staging: 'stg-app.',
	development: 'dev-app.',
};

const documentAlias = {
	production: 'docs.',
	staging: 'stg-docs.',
	development: 'dev-docs.',
};

export const sslArn =
	'arn:aws:acm:us-east-1:984261700405:certificate/c6375953-4ae4-4c6e-8357-38b215aed3a6';

export const landingDomainFromStage = (stage: string) => {
	const prefix = landingAlias[stage] || `${stage}.`;
	return `${prefix.trim()}walless.io`;
};

export const appDomainFromStage = (stage: string) => {
	const prefix = appAlias[stage] || `${stage}-app.`;
	return `${prefix}walless.io`;
};

export const documentDomainFromStage = (stage: string) => {
	const prefix = documentAlias[stage] || `${stage}-docs.`;
	return `${prefix}walless.io`;
};
