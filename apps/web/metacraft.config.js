const { compilerOptions } = require('./tsconfig.json');
const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { tamaguiBuild } = require('../../tool/webpack/tamagui');
const { copyAssets } = require('../../tool/webpack/asset');
const { useCache } = require('../../tool/webpack/optimization');
const { setEnvironments } = require('../../tool/webpack/env');

const isProd = process.env.ENV === 'production';
const injectEntries = (config) => {
	config.resolve.extensions.push('.mjs');

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

const swcOptions = () => ({
	jsc: {
		baseUrl: compilerOptions.baseUrl,
		paths: compilerOptions.paths,
		parser: {
			syntax: 'typescript',
			tsx: true,
			dynamicImport: true,
		},
		minify: isProd
			? {
					compress: true,
					mangle: true,
					format: {
						comments: false,
					},
			  }
			: {},
	},
	env: {
		targets: {
			chrome: '67',
			edge: '79',
			firefox: '68',
			opera: '54',
			safari: '14',
		},
	},
});

module.exports = {
	useReact: true,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	swcOptions,
	webpackMiddlewares: [
		useCache,
		copyAssets,
		injectEntries,
		tamaguiBuild,
		web3Polyfills,
		setEnvironments({
			BUILD_TARGET: JSON.stringify(process.env.BUILD_TARGET),
			process: {
				env: {
					TAMAGUI_TARGET: JSON.stringify('web'),
				},
			},
		}),
	],
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
