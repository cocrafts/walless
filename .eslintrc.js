module.exports = {
	root: true,
	extends: ['@metacraft/eslint-config'],
	ignorePatterns: ['tool/batch/**'],
	globals: {
		window: true,
		document: true,
		navigator: true,
		fetch: true,
		WebAssembly: true,
	},
};
