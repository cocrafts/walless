const babelConfig = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
	],
};

const jestConfig = {
	testMatch: ['**/tests/**/*.ts', '**/tests/**/*.tsx'],
};

module.exports = {
	babelConfig,
	jestConfig,
};
