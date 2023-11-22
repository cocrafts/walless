const setEnvironments =
	(variables = {}) =>
	(config, internal) => {
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
			...variables,
		});

		return config;
	};

module.exports = {
	setEnvironments,
};
