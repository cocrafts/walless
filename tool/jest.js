const babelConfig = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
	],
};

const jestConfig = {
	testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.test.tsx'],
};

module.exports = {
	babelConfig,
	jestConfig,
};
