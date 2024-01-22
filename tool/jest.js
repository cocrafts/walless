const babelConfig = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
	],
};

const jestConfig = {
	testMatch: ['**/*.test.ts', '**/*.test.tsx'],
};

module.exports = {
	babelConfig,
	jestConfig,
};
