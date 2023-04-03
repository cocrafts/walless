const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { copyAssets } = require('../../tool/webpack/asset');
const { setEnvironments } = require('../../tool/webpack/env');

module.exports = {
	useBabel: true,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackMiddlewares: [web3Polyfills, setEnvironments(), copyAssets],
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
		},
	},
};
