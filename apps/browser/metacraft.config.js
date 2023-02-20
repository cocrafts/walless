const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { generateSwcOptions } = require('../../tool/webpack/swc');
const { copyAssets } = require('../../tool/webpack/middleware/asset');
const { setEnvironments } = require('../../tool/webpack/middleware/env');
const { InjectManifest } = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const injectServiceWorker = (config) => {
	config.plugins.push(
		new InjectManifest({
			swSrc: './worker/index.ts',
			swDest: 'worker.js',
			maximumFileSizeToCacheInBytes: 10485760,
		}),
	);

	return config;
};

const injectEntries = (config) => {
	config.entry.content = {
		import: './worker/auth-parser.ts',
		filename: 'auth-parser.js',
	};

	return config;
};

module.exports = {
	useBabel: true,
	port: () => 3002,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	swcOptions: () => generateSwcOptions(),
	webpackMiddlewares: [
		web3Polyfills,
		setEnvironments,
		copyAssets,
		injectEntries,
		isProduction && injectServiceWorker,
	].filter((i) => !!i),
	htmlPluginOptions: {
		chunks: ['app'],
	},
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
		},
	},
};
