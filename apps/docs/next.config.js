const { DefinePlugin } = require('webpack');
const path = require('path');

module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	transpilePackages: ['@walless/gui', '@walless/markdown'],
	webpack: (config, { dev, isServer }) => {
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

		/**
		 * Server react-native compat
		 */
		if (isServer) {
			// externalize react native things from bundle
			config.externals = [
				...config.externals.map((external) => {
					if (typeof external !== 'function') return external;

					// only runs on server
					return async (ctx, cb) => {
						const mustExternalize = externalize(ctx.context, ctx.request);

						if (mustExternalize) return external(ctx, cb);
						else return undefined;
					};
				}),
			];
		}

		return config;
	},
};

const externalize = (context, request) => {
	const SEP = path.sep;
	const fullPath = request[0] === '.' ? path.join(context, request) : request;

	if (fullPath.includes('react-native-web')) return false;

	// must inline react-native so we can alias to react-native-web
	if (fullPath === 'react-native' || fullPath.startsWith(`react-native${SEP}`))
		return false;

	if (/^@?react-native-/.test(request)) return false;

	return true;
};
