const { web3Polyfills } = require('@metacraft/cli-web3-polyfills');
const { copyAssets } = require('../../tool/webpack/asset');
const { setEnvironments } = require('../../tool/webpack/env');

const isProd = process.env.ENV === 'production';
const isExtension = process.env.BUILD_TARGET === 'extension';

const injectEntries = (config) => {
	config.entry.kernel = {
		import: 'scripts/kernel/index.ts',
		filename: 'kernel.js',
	};

	if (isExtension) {
		config.entry.content = {
			import: 'scripts/content/index.ts',
			filename: 'content.js',
		};

		config.entry.injection = {
			import: 'scripts/content/injection.ts',
			filename: 'injection.js',
		};
	} else {
		config.entry.w3ar = {
			import: 'scripts/worker/w3a-response.ts',
			filename: 'w3a-response.js',
		};

		config.entry.fcm = {
			import: 'scripts/worker/fcm.ts',
			filename: 'firebase-messaging-sw.js',
		};
	}

	return config;
};

const registerExtFile = (config) => {
	if (isExtension) {
		config.resolve.extensions = [
			'.ext.ts',
			'.ext.tsx',
			...config.resolve.extensions,
		];
	}

	return config;
};

const buildOptimization = (config) => {
	config.cache = {
		type: 'filesystem',
	};

	config.optimization = {
		splitChunks: {
			chunks: (chunk) => {
				return ['content', 'injection'].indexOf(chunk.name) < 0;
			},
		},
	};

	return config;
};

const swcOptions = () => ({
	jsc: {
		parser: {
			syntax: 'typescript',
			tsx: true,
			dynamicImport: true,
		},
		minify: isProd
			? {
					compress: true,
					mangle: true,
					format: {
						comments: false,
					},
				}
			: {},
	},
	env: {
		targets: {
			chrome: '67',
			edge: '79',
			firefox: '68',
			opera: '54',
			safari: '14',
		},
	},
});

const w3aDevRoute = (config) => {
	config.historyApiFallback = {
		rewrites: [{ from: /^\/w3a/, to: '/w3a.html' }],
	};

	return config;
};

module.exports = {
	useReact: true,
	compiler: 'swc',
	publicPath: () => process.env.PUBLIC_URL || '/',
	keepPreviousBuild: () => true,
	buildId: () => 'app',
	swcOptions,
	webpackMiddlewares: [
		buildOptimization,
		copyAssets,
		registerExtFile,
		injectEntries,
		web3Polyfills,
		setEnvironments(),
	],
	devMiddlewares: [w3aDevRoute],
	htmlPluginOptions: {
		chunks: ['app'],
	},
	moduleAlias: {
		global: {
			'react-native$': 'react-native-web',
		},
	},
};
