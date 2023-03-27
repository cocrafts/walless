const withPlugins = require('next-compose-plugins');
const { withTamagui } = require('@tamagui/next-plugin');

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
	},
);
