const path = require('path');

/**
 * polyfill `chrome.runtime` usage of contentScript in web runtime
 */
module.exports.contentScriptPolyfill = (configs, { modules }) => {
	const { webpack } = modules;

	configs.plugins.push(
		new webpack.NormalModuleReplacementPlugin(/.\/utils/, (resource) => {
			const contentScriptScope = 'browser/content';
			const isInContentScriptScope =
				resource.contextInfo.issuer.includes(contentScriptScope);

			if (isInContentScriptScope && resource.request === './utils') {
				resource.request = path.resolve(__dirname, './polyfill.js');
			}
		}),
	);

	return configs;
};

/**
 * experimental, dApp side need to support proxy request
 */
module.exports.widgetsProxy = (configs) => {
	configs = {
		...configs,
		proxy: {
			'/widgets-proxy': {
				target: 'http://127.0.0.1:3011', // tezos dApp host
				pathRewrite: function () {
					return '/';
				},
				changeOrigin: true,
			},
		},
	};

	return configs;
};
