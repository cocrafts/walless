const { resolve } = require('path');

const projectRoot = __dirname;
const workspaceRoot = resolve(projectRoot, '../..');
const projectModules = resolve(projectRoot, 'node_modules');
const workspaceModules = resolve(workspaceRoot, 'node_modules');

const monoPackages = {
	'@walless/app': resolve(workspaceRoot, 'packages/app'),
	'@walless/core': resolve(workspaceRoot, 'packages/core'),
	'@walless/crypto': resolve(workspaceRoot, 'packages/crypto'),
	'@walless/gui': resolve(workspaceRoot, 'packages/gui'),
	'@walless/icons': resolve(workspaceRoot, 'packages/icons'),
	'@walless/markdown': resolve(workspaceRoot, 'packages/markdown'),
};

module.exports = {
	watchFolders: [workspaceModules, ...Object.values(monoPackages)],
	resolver: {
		nodeModulesPaths: [projectModules, workspaceModules],
		extraNodeModules: monoPackages,
	},
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: true,
			},
		}),
	},
};
