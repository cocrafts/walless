const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { generateSwcOptions } = require('../../tool/webpack/swc');
const { copyAssets } = require('../../tool/webpack/middleware/asset');
const { setEnvironments } = require('../../tool/webpack/middleware/env');

module.exports = {
	useBabel: true,
	port: () => 3002,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	swcOptions: () => generateSwcOptions(),
	webpackMiddlewares: [web3Polyfills, setEnvironments, copyAssets],
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
		},
	},
};
