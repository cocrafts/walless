const { DefinePlugin } = require('webpack');
const project = require('../web/package.json');

module.exports = {
	env: {
		EXTENSION_VERSION: project.version,
	},
	swcMinify: true,
	reactStrictMode: true,
	transpilePackages: [
		'@walless/gui',
		'@walless/markdown',
		'react-native-web',
		'react-native',
		'react-native-reanimated',
		'react-native-svg',
	],
	webpack: (config, { dev }) => {
		config.module.rules.push({
			test: /\.md$/i,
			type: 'asset/source',
		});

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
