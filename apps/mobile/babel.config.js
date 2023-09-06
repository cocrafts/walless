module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					assets: './assets',
					utils: './src/utils',
					state: './src/state',
					components: './src/components',
					stacks: './src/stacks',
					screens: './src/screens',
					crypto: 'react-native-quick-crypto',
					stream: './src/utils/mocks/stream',
					path: './src/utils/mocks/path',
					zlib: './src/utils/mocks/zlib',
					buffer: '@craftzdog/react-native-buffer',
					bip39: '@dreson4/react-native-quick-bip39',
					'pouchdb-collate': '@craftzdog/pouchdb-collate-react-native',
				},
			},
		],
		['react-native-reanimated/plugin'],
	],
};
