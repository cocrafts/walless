const { readFileSync, writeFileSync } = require('fs');
const { render } = require('mustache');

const args = process.argv.slice(2);
const gitBranch = args[0] || 'dev';
const isProduction = gitBranch === 'main';
const template = readFileSync('./tool/automation.tf').toString('utf-8');

const generatedScript = render(template, {
	gitBranch,
	id: `walless-${gitBranch}`,
	alias: isProduction ? 'walless.io' : 'walless-dev.io',
	sslArn:
		'arn:aws:acm:us-east-1:984261700405:certificate/323868a5-7bb1-49e2-9ab3-79a490fecc21',
});

writeFileSync('./main.tf', generatedScript);
