/* eslint-disable */

const {resolve} = require('path');
const workspaceRoot = resolve(__dirname, '../..');

const tamaguiBuild = (config, internal) => {
	const {webpack} = internal.modules;
	const isProd = process.env.ENV === 'production';
	const original = config.module.rules[0];
	const tamaguiOptions = {
		config: './tamagui.config.ts',
		components: ['@tamagui/core'],
		logTimings: false,
		disableExtraction: !isProd,
	};

	config.resolveLoader.modules.push(resolve(workspaceRoot, 'node_modules'));
	config.module.rules[0] = {
		test: /\.(ts|js)x?$/,
		use: [
			{
				loader: original.loader,
				options: original.options,
			},
			{
				loader: 'tamagui-loader',
				options: tamaguiOptions,
			}
		],
	};

	config.plugins.push(new webpack.EnvironmentPlugin({JEST_WORKER_ID: null}));

	return config;
};

module.exports = {
	tamaguiBuild,
};
