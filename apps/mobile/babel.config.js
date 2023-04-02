module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					crypto: '@chainsoft/react-native-quick-crypto',
					stream: 'stream-browserify',
					buffer: '@craftzdog/react-native-buffer',
				},
			},
		],
		[
			'@tamagui/babel-plugin',
			{
				components: ['@tamagui/core'],
				config: './tamagui.config.ts',
				importsWhitelist: ['constants.js', 'colors.js'],
				logTimings: true,
				disableExtraction: process.env.NODE_ENV !== 'production',
			},
		],
		[
			'transform-inline-environment-variables',
			{
				include: ['TAMAGUI_TARGET'],
			},
		],
		'react-native-reanimated/plugin',
	],
};
