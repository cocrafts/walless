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

export const landingDomainFromStage = (stage: string) => {
	const prefix = landingAlias[stage] || `${stage}.`;
	return `${prefix.trim()}walless.io`;
};

export const appDomainFromStage = (stage: string) => {
	const prefix = appAlias[stage] || `${stage}-app.`;
	return `${prefix}walless.io`;
};
