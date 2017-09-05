const path = require('path');

module.exports = function getPaths(config) {
	const configDir = path.join(
		config.steam,
		'userdata',
		config.userId,
		'config'
	);
	return {
		shortcutsVdf: path.join(configDir, 'shortcuts.vdf'),
		shortcutsManifestJson: path.join(configDir, 'shortcuts.manifest.json'),
		grid: path.join(configDir, 'grid')
	};
};
