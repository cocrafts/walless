const setEnvironments =
	(varables = {}) =>
	(configs, internal) => {
		const { webpack } = internal.modules;
		const { DefinePlugin } = webpack;
		const env = internal.configs.env();
		const isProduction = internal.configs.isProduction(env);

		configs.plugins[0] = new DefinePlugin({
			process: { env: {} },
			__DEV__: !isProduction,
			ENV: JSON.stringify(env),
			GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
			...varables,
		});

		return configs;
	};

module.exports = {
	setEnvironments,
};
