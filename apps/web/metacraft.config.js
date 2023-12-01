const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { copyAssets } = require('../../tool/webpack/asset');
const { useCache } = require('../../tool/webpack/optimization');
const { setEnvironments } = require('../../tool/webpack/env');

const isProd = process.env.ENV === 'production';
const isExtension = process.env.BUILD_TARGET === 'extension';

const registerExtensionEntry = (config) => {
	if (isExtension) {
		config.resolve.extensions = [
			'.ext.ts',
			'.ext.tsx',
			...config.resolve.extensions,
		];
	}

	console.log(config.resolve);
	return config;
};

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

	if (!isExtension) {
		config.entry.fcm = {
			import: 'scripts/worker/fcm.ts',
			filename: 'firebase-messaging-sw.js',
		};
	}

	return config;
};

const swcOptions = () => ({
	jsc: {
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

const w3aDevRoute = (config) => {
	config.historyApiFallback = {
		rewrites: [{ from: /^\/w3a/, to: '/w3a.html' }],
	};

	return config;
};

module.exports = {
	useReact: true,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	swcOptions,
	webpackMiddlewares: [
		useCache,
		copyAssets,
		registerExtensionEntry,
		injectEntries,
		web3Polyfills,
		setEnvironments(),
	],
	devMiddlewares: [w3aDevRoute],
	htmlPluginOptions: {
		chunks: ['app'],
	},
	moduleAlias: {
		global: {
			'react-native$': 'react-native-web',
		},
	},
};
