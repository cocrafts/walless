const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const copyAssets = (configs) => {
	configs.module.rules[1].use[1] = {
		loader: 'css-loader',
		options: { url: false },
	};

	configs.plugins.push(
		new CopyPlugin({
			patterns: [
				{
					from: resolve(process.cwd(), 'assets/'),
					to: './',
					filter: (uri) => {
						const isFont = uri.indexOf('/fonts/') >= 0;
						const isTemplate = uri.endsWith('.ejs') || uri.endsWith('.sass');

						return !isFont && !isTemplate;
					},
				},
			],
		}),
	);

	return configs;
};

module.exports = {
	copyAssets,
};
