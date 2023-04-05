const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { useCache } = require('../../tool/webpack/optimization');
const { tamaguiBuild } = require('../../tool/webpack/tamagui');
const { copyAssets } = require('../../tool/webpack/asset');
const { setEnvironments } = require('../../tool/webpack/env');

const isProd = process.env.ENV === 'production';
const injectEntries = (config) => {
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
	useReact: true,
	port: () => 3003,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackMiddlewares: [
		useCache,
		injectEntries,
		tamaguiBuild,
		copyAssets,
		web3Polyfills,
		setEnvironments({
			process: {
				env: {
					TAMAGUI_TARGET: JSON.stringify('web'),
				},
			},
		}),
	],
	swcOptions: () => ({
		minify: isProd,
		env: {
			targets: {
				chrome: '67',
				edge: '79',
				firefox: '68',
				opera: '54',
				safari: '14',
			},
		},
		jsc: {
			minify: {
				compress: true,
				mangle: true,
				format: {
					comments: false,
				},
			},
		},
	}),
	htmlPluginOptions: {
		chunks: ['app'],
	},
	moduleAlias: {
		global: {
			'react-native$': 'react-native-web',
			'react-native-web$': 'react-native-web',
			'react-native-svg': require.resolve('@tamagui/react-native-svg'),
		},
	},
};
