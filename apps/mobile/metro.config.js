const { resolve } = require('path');

const projectRoot = __dirname;
const workspaceRoot = resolve(projectRoot, '../..');
const projectModules = resolve(projectRoot, 'node_modules');
const workspaceModules = resolve(workspaceRoot, 'node_modules');

const monoPackages = {
	'@walless/component': resolve(workspaceRoot, 'packages/component'),
	'@walless/gui': resolve(workspaceRoot, 'packages/gui'),
	'@walless/store': resolve(workspaceRoot, 'packages/store'),
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
