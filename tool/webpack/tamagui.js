/* eslint-disable */

const { resolve } = require('path');
const { TamaguiPlugin } = require('tamagui-loader')

const workspaceRoot = resolve(__dirname, '../..');
const useEsBuild = process.env.ESBUILD === 'true';

const tamaguiBuild = (config, internal) => {
	const { webpack } = internal.modules;
	const isProd = process.env.ENV === 'production';
	const original = config.module.rules[0];
	const tamaguiOptions = {
		config: './tamagui.config.ts',
		components: ['@tamagui/core'],
		importsWhitelist: ['constants.js', 'colors.js'],
		logTimings: true,
		disableExtraction: !isProd,
	};

	config.resolveLoader.modules.push(resolve(workspaceRoot, 'node_modules'));
	config.module.rules[0] = {
		test: /\.(ts|js)x?$/,
		use: [
			useEsBuild ? {
				loader: 'esbuild-loader',
				options: {
					loader: 'tsx',
					target: [
						'chrome67',
						'edge79',
						'firefox68',
						'opera54',
						'safari14',
					],
				}
			} : {
				loader: original.loader,
				options: original.options,
			},
			{
				loader: 'tamagui-loader',
				options: tamaguiOptions,
			}
		],
	};

	config.plugins.push(new webpack.EnvironmentPlugin({ JEST_WORKER_ID: null }));

	return config;
};

module.exports = {
	tamaguiBuild,
};
