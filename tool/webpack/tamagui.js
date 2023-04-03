/* eslint-disable */

const { resolve } = require('path');
const { TamaguiPlugin } = require('tamagui-loader')

const workspaceRoot = resolve(__dirname, '../..');

const tamaguiBuild = (config, internal) => {
	const { webpack } = internal.modules;
	const original = config.module.rules[0];
	const tamaguiOptions = {
		config: './tamagui.config.ts',
		components: ['@tamagui/core'],
		importsWhitelist: ['constants.js', 'colors.js'],
		logTimings: true,
		disableExtraction: process.env.NODE_ENV !== 'production',
	};

	config.resolveLoader.modules.push(resolve(workspaceRoot, 'node_modules'));
	config.module.rules[0] = {
		test: /\.[jt]sx?$/,
		use: [
			{
				loader: original.loader,
				options: original.options,
			},
			{
				loader: 'tamagui-loader',
				options: tamaguiOptions,
			},
		],
	};

	config.plugins.push(new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }));
	config.plugins.push(new TamaguiPlugin(tamaguiOptions));

	return config;
};

module.exports = {
	tamaguiBuild,
};
