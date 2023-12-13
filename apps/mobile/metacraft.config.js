const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env === 'production';
const isExtension = process.env.BUILD_TARGET === 'extension';

const copyAssets = (config) => {
	config.module.rules[1].use[1] = {
		loader: 'css-loader',
		options: { url: false },
	};

	config.plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: resolve(process.cwd(), 'assets/'),
					to: './',
					filter: (uri) => {
						const isFont = uri.indexOf('/fonts/') >= 0;
						const isTemplate = uri.endsWith('.ejs') || uri.endsWith('.sass');

						return !isFont && !isTemplate;
					},
				},
			],
		}),
	);

	return config;
};

const registerExtFile = (config) => {
	if (isExtension) {
		config.resolve.extensions = [
			'.ext.ts',
			'.ext.tsx',
			...config.resolve.extensions,
		];
	}

	return config;
};

const injectEnvironments = (config, internal) => {
	const { webpack } = internal.modules;
	const { DefinePlugin } = webpack;
	const env = internal.configs.env();
	const isProduction = internal.configs.isProduction(env);
	const environments = [
		'BROWSER_CLIENT_ID',
		'EXTENSION_CLIENT_ID',
		'FIREBASE_API_KEY',
		'FIREBASE_AUTH_DOMAIN',
		'FIREBASE_PROJECT_ID',
		'FIREBASE_STORAGE_BUCKET',
		'FIREBASE_MESSAGING_SENDER_ID',
		'FIREBASE_APP_ID',
		'FIREBASE_MEASUREMENT_ID',
		'WEB3AUTH_ID',
		'GATEFI_ENDPOINT',
		'GATEFI_MERCHANT_ID',
		'FIREBASE_VAPID_KEY',
		'BUILD_TARGET',
		'GRAPHQL_ENDPOINT',
		'GASILON_ENDPOINT',
		'PIXEVERSE_ENDPOINT',
		'PIXEVERSE_ORIGIN',
		'PIXEVERSE_URL',
		'SOLANA_CLUSTER_URL',
	].reduce((a, i) => {
		a[i] = JSON.stringify(process.env[i]);
		return a;
	}, {});

	config.plugins[0] = new DefinePlugin({
		__DEV__: !isProduction,
		ENV: JSON.stringify(env),
		...environments,
	});

	return config;
};

const w3aDevRoute = (config) => {
	config.historyApiFallback = {
		rewrites: [{ from: /^\/w3a/, to: '/w3a.html' }],
	};

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

module.exports = {
	swcOptions,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackMiddlewares: [
		copyAssets,
		registerExtFile,
		web3Polyfills,
		injectEnvironments,
	],
	devMiddlewares: [w3aDevRoute],
	htmlPluginOptions: {
		chunks: ['app'],
	},
	moduleAlias: {
		global: {
			'react-native$': 'react-native-web',
			'react-native-keychain': 'vendor/web-keychain',
			'react-native-haptic-feedback': 'vendor/web-haptic',
		},
	},
};
