const { resolve } = require('path');

module.exports = {
	watchFolders: [resolve(__dirname, '../../node_modules')],
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
	},
};
