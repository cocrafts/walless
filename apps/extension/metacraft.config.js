const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { copyAssets } = require('../../tool/webpack/asset');
const { useCache } = require('../../tool/webpack/optimization');
const { setEnvironments } = require('../../tool/webpack/env');

const injectEntries = (config) => {
	config.entry.app.import.unshift('raf/polyfill');
	config.entry.app.import.unshift('setimmediate');

	config.entry.content = {
		import: 'scripts/content/index.ts',
		filename: 'content.js',
	};

	config.entry.injection = {
		import: 'scripts/content/injection.ts',
		filename: 'injection.js',
	};

	config.entry.background = {
		import: 'scripts/background/index.ts',
		filename: 'background.js',
	};

	config.entry.kernel = {
		import: 'scripts/kernel/index.ts',
		filename: 'kernel.js',
	};

	config.entry.w3ar = {
		import: 'scripts/worker/w3a-response.ts',
		filename: 'w3a-response.js',
	};

	return config;
};

module.exports = {
	useBabel: true,
	port: () => 3001,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	swcOptions: () => ({
		env: {
			targets: {
				chrome: '67',
				edge: '79',
				firefox: '68',
				opera: '54',
				safari: '14',
			},
			jsc: {
				baseUrl: '.',
				paths: {
					'components/*': ['./src/components/*'],
					'stacks/*': ['./src/stacks/*'],
					'screens/*': ['./src/screens/*'],
					'utils/*': ['./src/utils/*'],
					'bridge/*': ['./src/bridge/*'],
				},
			},
		},
	}),
	webpackMiddlewares: [
		useCache,
		injectEntries,
		web3Polyfills,
		setEnvironments({
			VERSION: JSON.stringify(require('./package.json').version),
		}),
		copyAssets,
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
