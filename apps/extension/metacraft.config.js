const { compilerOptions } = require('./tsconfig.json');
const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { copyAssets } = require('../../tool/webpack/asset');
const { useCache } = require('../../tool/webpack/optimization');
const { setEnvironments } = require('../../tool/webpack/env');

const injectEntries = (config) => {
	config.resolve.extensions.push('.mjs');

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

const swcOptions = () => ({
	jsc: {
		baseUrl: compilerOptions.baseUrl,
		paths: compilerOptions.paths,
		parser: {
			syntax: 'typescript',
			tsx: true,
			dynamicImport: true,
		},
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
	useBabel: false,
	useReact: true,
	port: () => 3001,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	swcOptions,
	webpackMiddlewares: [
		useCache,
		copyAssets,
		injectEntries,
		web3Polyfills,
		setEnvironments({
			VERSION: JSON.stringify(require('./package.json').version),
		}),
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
