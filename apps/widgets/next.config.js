const { DefinePlugin } = require('webpack');

module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	transpilePackages: [
		'@walless/gui',
		'react',
		'react-native',
		'react-native-reanimated',
		'react-native-svg',
	],
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	webpack: (config, { dev }) => {
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'react-native$': 'react-native-web',
		};

		config.resolve.extensions = [
			'.web.js',
			'.web.jsx',
			'.web.ts',
			'.web.tsx',
			...config.resolve.extensions,
		];

		config.plugins.push(
			new DefinePlugin({
				__DEV__: dev,
			}),
		);

		return config;
	},
};
