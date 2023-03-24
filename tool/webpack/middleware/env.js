const devGoogleClientId =
	'474398641068-f7mbjjtstm2d7eb0lerhh4en7bp3gdd7.apps.googleusercontent.com';

const setEnvironments =
	(varables = {}) =>
	(configs, internal) => {
		const { webpack } = internal.modules;
		const { DefinePlugin } = webpack;
		const env = internal.configs.env();
		const isProduction = internal.configs.isProduction(env);

		configs.plugins[0] = new DefinePlugin({
			__DEV__: !isProduction,
			ENV: JSON.stringify(env),
			GOOGLE_CLIENT_ID: JSON.stringify(
				process.env.GOOGLE_CLIENT_ID || devGoogleClientId,
			),
			...varables,
		});

		return configs;
	};

module.exports = {
	setEnvironments,
};
