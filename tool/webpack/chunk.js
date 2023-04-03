const splitChunks = (config) => {
	config.entry = {
		app: {
			...config.entry.app,
			dependOn: ['core-libs'],
		},
		'core-libs': {
			import: ['react', 'react-dom', 'dexie'],
		},
	};

	return config;
};

module.exports = {
	splitChunks,
};
