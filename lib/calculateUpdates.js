const fs = require('fs-extra');

const checkManifest = require('./checkManifest');
const generateManifest = require('./generateManifest');
const generateUpdatedVdf = require('./generateUpdatedVdf');

module.exports = async function calculateUpdates(config, paths) {
	const updatedManifest = await generateManifest(config);
	if (!checkManifest(updatedManifest)) {
		process.exit(1);
	}
	const originalManifest = JSON.parse(
		await fs.readFile(paths.shortcutsManifestJson)
	);

	const originalVdf = await fs.readFile(paths.shortcutsVdf);
	const updatedVdf = await generateUpdatedVdf(
		config,
		originalVdf,
		originalManifest,
		updatedManifest
	);

	return { originalVdf, updatedVdf, originalManifest, updatedManifest };
};
