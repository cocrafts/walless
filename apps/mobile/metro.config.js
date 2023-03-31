/* eslint-disable */

const { resolve } = require('path');

module.exports = {
	watchFolders: [
		resolve(__dirname, '../../node_modules'),
		resolve(__dirname, '../../node_modules/@walless/gui'),
	],
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
	},
};
