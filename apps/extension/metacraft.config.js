const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

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
	webpackMiddlewares: [setEnvironments, copyAssets],
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
		},
	},
};
