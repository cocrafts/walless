const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ReplaceInFilePlugin = require('replace-in-file-webpack-plugin');

const isProd = process.env.ENV === 'production';
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
						const isTemplate = uri.endsWith('.ejs') || uri.endsWith('.sass');
						return !isTemplate;
					},
				},
			],
		}),
	);

	return config;
};

const injectEntries = (config) => {
	config.entry.kernel = {
		import: 'browser/kernel/index.ts',
		filename: 'kernel.js',
	};

	if (isExtension) {
		config.entry.content = {
			import: 'browser/content/index.ts',
			filename: 'content.js',
		};

		config.entry.injection = {
			import: 'browser/content/injection.ts',
			filename: 'injection.js',
		};
	} else {
		config.entry.w3ar = {
			import: 'browser/worker/w3a-response.ts',
			filename: 'w3a-response.js',
		};

		config.entry.fcm = {
			import: 'browser/worker/fcm.ts',
			filename: 'firebase-messaging-sw.js',
		};
	}

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

const buildOptimization = (config) => {
	config.cache = {
		type: 'filesystem',
	};

	return config;
};

const w3aDevRoute = (config) => {
	config.historyApiFallback = {
		rewrites: [{ from: /^\/w3a/, to: '/w3a.html' }],
	};

	return config;
};

const injectEnvironments = (config, internal) => {
	const { webpack } = internal.modules;
	const { DefinePlugin } = webpack;
	const env = internal.configs.env();
	const isProduction = internal.configs.isProduction(env);
	const environments = [
		'NETWORK_CLUSTER',
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
		'JUPITER_TOKENS_ENDPOINT',
		'JUPITER_API_ENDPOINT',
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

const replaceExtensionArgonLinks = (config) => {
	if (isExtension) {
		config.plugins.push(
			new ReplaceInFilePlugin([
				{
					dir: 'metacraft',
					test: [/app.js(\.map)?$/],
					rules: [
						{
							search: 'https://apis.google.com/js/api.js',
							replace: '',
						},
						{
							search: 'https://www.googletagmanager.com/gtag/js',
							replace: '',
						},
					],
				},
			]),
		);
	}

	return config;
};

const minifyOption = {
	compress: true,
	mangle: true,
	format: { comments: false },
};

const swcOptions = () => ({
	jsc: {
		parser: {
			syntax: 'typescript',
			tsx: true,
			dynamicImport: true,
		},
		minify: isProd ? {} : minifyOption,
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
	copyAssets,
	w3aDevRoute,
	injectEntries,
	registerExtFile,
	buildOptimization,
	injectEnvironments,
	replaceExtensionArgonLinks,
};
