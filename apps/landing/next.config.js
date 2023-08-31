const withPlugins = require('next-compose-plugins');
const { withTamagui } = require('@tamagui/next-plugin');
const project = require('../web/package.json');
const { DefinePlugin } = require('webpack');
const path = require('path');

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
			GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
			SOLANA_CLUSTER_URL: process.env.SOLANA_CLUSTER_URL,
		},
		webpack: (config, { dev, isServer, webpack }) => {
			config.module.rules.push({
				test: /\.md$/i,
				type: 'asset/source',
			});

			config.plugins.push(
				new DefinePlugin({
					__DEV__: dev,
					'process.env.TAMAGUI_TARGET': '"web"',
				}),
			);

			if (isServer) {
				config.plugins.push(
					new webpack.ProvidePlugin({
						requestAnimationFrame: path.resolve(__dirname, './raf.js'),
					}),
				);
			}

			return config;
		},
	},
);
