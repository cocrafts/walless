module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		'react-native-reanimated/plugin',
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
	],
};
