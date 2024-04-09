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

module.exports = {
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	webpackMiddlewares: [web3Polyfills, injectEnvironments],
	devMiddlewares: [],
	htmlPluginOptions: {
		chunks: ['app'],
	},
	moduleAlias: {},
};
