const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');

const injectEnvironments = (configs, internal) => {
	const { webpack } = internal.modules;
	const { DefinePlugin } = webpack;
	const env = internal.configs.env;
	const isProduction = internal.configs.isProduction;

	configs.plugins[0] = new DefinePlugin({
		__DEV__: !isProduction,
		ENV: JSON.stringify(env),
	});

	return configs;
};

const addDevServerLogs = (configs) => {
	configs = {
		...configs,
		historyApiFallback: { verbose: true },
		setupMiddlewares: (middlewares) => {
			middlewares.unshift({
				name: 'logger',
				path: '/',
				middleware: (req, _res, next) => {
					console.log(`from ${req.ip} - ${req.method} - ${req.originalUrl}`);
					next();
				},
			});

			return middlewares;
		},
	};

	return configs;
};

module.exports = {
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackMiddlewares: [web3Polyfills, injectEnvironments],
	devMiddlewares: [addDevServerLogs],
	htmlPluginOptions: {
		chunks: ['app'],
	},
	moduleAlias: {},
};
