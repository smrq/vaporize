module.exports = function parseConfig(config) {
	if (!config.formatTitle) {
		config.formatTitle = identity;
	}

	return config;

	function identity(x) {
		return x;
	}
};
