/** @type {import('jest').Config} */
module.exports = {
	preset: 'react-native',
	...require('../../tool/jest').jestConfig,
	moduleNameMapper: {
		// Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
		uuid: require.resolve('uuid'),
	},
};
