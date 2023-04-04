const optimizeBuild = (config) => {
	config.cache = {
		type: 'filesystem',
	};

	return config;
};

module.exports = {
	optimizeBuild,
};
