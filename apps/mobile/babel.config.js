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
		['react-native-reanimated/plugin'],
	],
};
