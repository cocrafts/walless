module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				alias: {
					components: './src/components',
					stacks: './src/stacks',
					screens: './src/screens',
					utils: './src/utils',
				},
			},
		],
		'@babel/plugin-proposal-export-namespace-from',
		'react-native-reanimated/plugin',
		'react-native-web',
	],
};
