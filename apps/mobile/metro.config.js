const { resolve } = require('path');

const projectRoot = __dirname;
const workspaceRoot = resolve(projectRoot, '../..');
const projectModules = resolve(projectRoot, 'node_modules');
const workspaceModules = resolve(workspaceRoot, 'node_modules');

const monoPackages = {
	'@walless/core': resolve(workspaceRoot, 'packages/core'),
	'@walless/gui': resolve(workspaceRoot, 'packages/gui'),
	'@walless/app': resolve(workspaceRoot, 'packages/app'),
	'@walless/icons': resolve(workspaceRoot, 'packages/icons'),
	'@walless/store': resolve(workspaceRoot, 'packages/store'),
	'@walless/crypto': resolve(workspaceRoot, 'packages/crypto'),
	'@walless/messaging': resolve(workspaceRoot, 'packages/messaging'),
	'@walless/crypto-keys': resolve(workspaceRoot, 'packages/crypto-keys'),
};

module.exports = {
	watchFolders: [workspaceModules, ...Object.values(monoPackages)],
	resolver: {
		nodeModulesPaths: [projectModules, workspaceModules],
		extraNodeModules: monoPackages,
		disableHierarchicalLookup: true,
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
