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

module.exports = {
	setEnvironments,
};
