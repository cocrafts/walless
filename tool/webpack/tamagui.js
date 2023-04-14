/* eslint-disable */

const { resolve } = require('path');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const workspaceRoot = resolve(__dirname, '../..');
const useEsBuild = false;

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

	config.resolve.mainFields.unshift('module:jsx');
	config.resolveLoader.modules.push(resolve(workspaceRoot, 'node_modules'));

	if (!useEsBuild) {
		config.resolve.extensions.push('.mjs');
	}

	config.module.rules[0] = {
		test: /\.(ts|js)x?$/,
		use: [
			useEsBuild ? {
				loader: 'esbuild-loader',
				options: {
					loader: 'tsx',
					jsx: 'automatic',
					minify: false,
					target: ['es2022'],
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

	config.resolve.plugins = [new TsconfigPathsPlugin()];
	config.plugins.push(new webpack.EnvironmentPlugin({JEST_WORKER_ID: null}));

	return config;
};

module.exports = {
	tamaguiBuild,
};
