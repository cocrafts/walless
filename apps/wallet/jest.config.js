/** @type {import('jest').Config} */
module.exports = {
	preset: 'react-native',
	...require('../../tool/jest').jestConfig,
	moduleNameMapper: {
		// Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
		uuid: require.resolve('uuid'),
		'@solana/codecs-data-structures': require.resolve(
			'@solana/codecs-data-structures',
		),
		'@solana/codecs-core': require.resolve('@solana/codecs-core'),
		'@solana/codecs-numbers': require.resolve('@solana/codecs-numbers'),
		'@solana/codecs-strings': require.resolve('@solana/codecs-strings'),
		'@solana/options': require.resolve('@solana/options'),
	},
	setupFiles: ['./testSetup.js'],
};
