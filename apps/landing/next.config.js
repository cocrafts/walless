const withPlugins = require('next-compose-plugins');
const { withTamagui } = require('@tamagui/next-plugin');
const project = require('../web/package.json');
const { DefinePlugin } = require('webpack');

module.exports = withPlugins(
	[
		withTamagui({
			config: './tamagui.config.js',
			components: ['@tamagui/core'],
			disableExtraction: process.env.NODE_ENV !== 'production',
			excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker'],
		}),
		{
			transpilePackages: [
				'@walless/ui',
				'@walless/gui',
				'@walless/icons',
				'@walless/markdown',
			],
		},
	],
	{
		swcMinify: true,
		typescript: {
			ignoreBuildErrors: true,
		},
		reactStrictMode: false,
		optimizeFonts: true,
		experimental: {
			esmExternals: true,
			forceSwcTransforms: true,
			scrollRestoration: true,
			legacyBrowsers: false,
		},
		env: {
			EXTENSION_VERSION: project.version,
		},
		webpack: (config) => {
			config.module.rules.push({
				test: /\.md$/i,
				type: 'asset/source',
			});
			config.plugins.push(
				new DefinePlugin({
					'process.env.TAMAGUI_TARGET': '"web"',
				}),
			);

			return config;
		},
	},
);
