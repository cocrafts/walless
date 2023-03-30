const splitChunks = (configs) => {
	configs.entry = {
		app: {
			...configs.entry.app,
			dependOn: ['core-libs'],
		},
		'core-libs': {
			import: ['react', 'react-dom', 'dexie'],
		},
	};

	return configs;
};

module.exports = {
	splitChunks,
};
