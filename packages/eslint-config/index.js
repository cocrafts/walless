module.exports = {
	extends: [
		require.resolve('./base'),
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
	],
	plugins: ['react-hooks'],
	rules: {
		'react-hooks/rules-of-hooks': 'error',
	},
	settings: {
		react: { version: 'detect' },
	},
	globals: {
		document: true,
	},
};
