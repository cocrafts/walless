module.exports = {
	root: true,
	extends: ['@walless/eslint-config'],
	ignorePatterns: ['tool/batch/**', 'packages/core/utils/platform.ts'],
	globals: {
		window: true,
		document: true,
		navigator: true,
		fetch: true,
		WebAssembly: true,
	},
};
