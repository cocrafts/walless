const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { generateSwcOptions } = require('../../tool/webpack/swc');
const { copyAssets } = require('../../tool/webpack/middleware/asset');
const { setEnvironments } = require('../../tool/webpack/middleware/env');

const injectEntries = (config) => {
	config.entry.content = {
		import: 'scripts/content.ts',
		filename: 'content.js',
	};

	config.entry.background = {
		import: 'scripts/background.ts',
		filename: 'background.js',
	};

	return config;
};

module.exports = {
	useBabel: true,
	port: () => 3001,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	swcOptions: () => generateSwcOptions(),
	webpackMiddlewares: [
		injectEntries,
		web3Polyfills,
		setEnvironments({
			VERSION: JSON.stringify(require('./package.json').version),
		}),
		copyAssets,
	],
	htmlPluginOptions: {
		chunks: ['app'],
	},
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
		},
	},
};
