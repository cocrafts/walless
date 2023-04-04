module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2021,
		ecmaFeatures: { jsx: true },
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
	extends: [
		'eslint:recommended',
		'plugin:import/typescript',
		'plugin:@next/next/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	],
	rules: {
		'@typescript-eslint/no-var-requires': 'off',

		'simple-import-sort/exports': 'error',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					[
						'^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
					], // Node.js builtins
					['^react', '^@?\\w'], // Packages. `react` related packages come first.
					['^\\u0000'], // Side effect imports.
					['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent imports. Put `..` last.
					['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Other relative imports. Put same-folder imports and `.` last.
					['^.+\\.s?css$'], // Style imports.
				],
			},
		],

		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				useTabs: true,
				trailingComma: 'all',
				singleQuote: true,
				tabWidth: 2,
			},
		],
	},
	globals: {
		module: true,
		require: true,
		process: true,
	},
};
