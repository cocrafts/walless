const useCache = (config) => {
	config.cache = {
		type: 'filesystem',
	};

	return config;
};

module.exports = {
	useCache,
};
