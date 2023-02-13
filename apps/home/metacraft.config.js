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
	useBabel: true,
	swcOptions: () => ({
		jsc: {
			baseUrl: '.',
			paths: {
				'components/*': ['./src/components/*'],
				'stacks/*': ['./src/stacks/*'],
				'screens/*': ['./src/screens/*'],
				'utils/*': ['./src/utils/*'],
				'build/*': ['./submodules/build/src/*'],
			},
			experimental: {
				plugins: [
					['@nissy-dev/swc-plugin-react-native-web', { commonjs: true }],
				],
			},
		},
	}),
	webpackMiddlewares: [setEnvironments],
	moduleAlias: {
		global: {
			'react-native': 'react-native-web',
		},
	},
};
