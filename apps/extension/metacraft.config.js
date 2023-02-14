const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const compatible = (configs, { modules }) => {
	const { webpack } = modules;
	const fallback = Object.assign(configs.resolve.fallback || {}, {
		crypto: require.resolve('crypto-browserify'),
		stream: require.resolve('stream-browserify'),
		assert: require.resolve('assert'),
		http: require.resolve('stream-http'),
		https: require.resolve('https-browserify'),
		os: require.resolve('os-browserify'),
		url: require.resolve('url'),
	});
	const plugins = {
		process: 'process/browser',
		Buffer: ['buffer', 'Buffer'],
	};

	configs.ignoreWarnings = [/Failed to parse source map/];
	configs.plugins.push(new webpack.ProvidePlugin(plugins));
	configs.resolve.fallback = fallback;
	configs.module.rules.push({
		test: /\.(js|mjs|jsx)$/,
		enforce: 'pre',
		loader: require.resolve('source-map-loader'),
		resolve: {
			fullySpecified: false,
		},
	});

	return configs;
};

const setEnvironments = (configs, internal) => {
	const { webpack } = internal.modules;
	const { DefinePlugin } = webpack;
	const env = internal.configs.env();
	const isProduction = internal.configs.isProduction(env);

	configs.plugins[0] = new DefinePlugin({
		process: { env: {} },
		__DEV__: !isProduction,
		ENV: JSON.stringify(env),
	});

	return configs;
};

const copyAssets = (configs) => {
	configs.plugins.push(
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

	return configs;
};

module.exports = {
	useBabel: false,
	port: () => 3001,
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	swcOptions: () => ({
		jsc: {
			baseUrl: '.',
			paths: {
				'components/*': ['./src/components/*'],
				'screens/*': ['./src/screens/*'],
				'utils/*': ['./src/utils/*'],
			},
			experimental: {
				plugins: [
					['@nissy-dev/swc-plugin-react-native-web', { commonjs: true }],
				],
			},
		},
	}),
	webpackMiddlewares: [compatible, setEnvironments, copyAssets],
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
		},
	},
};
