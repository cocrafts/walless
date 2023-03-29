const withPlugins = require('next-compose-plugins');
const { withTamagui } = require('@tamagui/next-plugin');
const { externalScripts } = require('./scripts/bundler');

module.exports = withPlugins(
	[
		withTamagui({
			config: './tamagui.config.js',
			components: ['tamagui'],
			useReactNativeWebLite: true,
			disableExtraction: process.env.NODE_ENV !== 'production',
			excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker'],
		}),
	],
	{
		transpilePackages: ['react-native-reanimated'],
		webpack: (config) => {
			const originalEntry = config.entry;

			config.entry = async () => {
				const entries = await originalEntry();

				for (const name of externalScripts) {
					entries[name] = {
						import: `scripts/${name}/index.ts`,
						filename: `${name}.js`,
					};
				}

				return entries;
			};

			return config;
		},
	},
);
