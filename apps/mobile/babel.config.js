module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					utils: './src/utils',
					stacks: './src/stacks',
					screens: './src/screens',
					crypto: 'react-native-quick-crypto',
					stream: 'stream-browserify',
					buffer: '@craftzdog/react-native-buffer',
					bip39: '@dreson4/react-native-quick-bip39',
					'pouchdb-collate': '@craftzdog/pouchdb-collate-react-native',
				},
			},
		],
		['react-native-reanimated/plugin'],
	],
};
