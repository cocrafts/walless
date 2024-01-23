module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					assets: './assets',
					utils: './src/utils',
					engine: './src/engine',
					state: './src/state',
					features: './src/features',
					components: './src/components',
					modals: './src/modals',
					stacks: './src/stacks',
					screens: './src/screens',
					crypto: 'react-native-quick-crypto',
					path: './vendor/path',
					zlib: './vendor/zlib',
					stream: 'stream-browserify',
					buffer: '@craftzdog/react-native-buffer',
					bip39: '@dreson4/react-native-quick-bip39',
					'pouchdb-collate': '@craftzdog/pouchdb-collate-react-native',
				},
			},
		],
		['react-native-reanimated/plugin'],
		'@babel/plugin-proposal-export-namespace-from',
	],
};
