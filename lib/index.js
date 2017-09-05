const fs = require('fs-extra');
const path = require('path');

const checkManifest = require('./checkManifest');
const generateManifest = require('./generateManifest');
const generateUpdatedVdf = require('./generateUpdatedVdf');
const parseConfig = require('./parseConfig');
const template = require('./template');

module.exports = async function run(config) {
	config = parseConfig(config);

	const paths = require('./paths')(config);

	const manifest = await generateManifest(config);

	if (!checkManifest(manifest)) {
		process.exit(1);
	}

	const originalVdf = await fs.readFile(paths.shortcutsVdf);
	const updatedVdf = await generateUpdatedVdf(config, originalVdf, manifest);

	try {
		console.log('Writing manifest...');
		await fs.writeFile(
			paths.shortcutsManifestJson,
			JSON.stringify(manifest, null, '\t')
		);
		console.log('Manifest written to: ' + paths.shortcutsManifestJson + '\n');
	} catch (err) {
		console.error('ERROR: ' + err);
		process.exit(1);
	}

	try {
		console.log('Backing up shortcuts file...');
		await fs.copy(paths.shortcutsVdf, paths.shortcutsVdf + '.backup');
		console.log('Done.\n');
	} catch (err) {
		console.error('ERROR: ' + err);
		process.exit(1);
	}

	try {
		console.log('Writing shortcuts file...');
		await fs.writeFile(paths.shortcutsVdf, updatedVdf);
		console.log('Done.\n');
	} catch (err) {
		console.error('ERROR: ' + err);

		console.log('Restoring shortcuts file backup...');
		await fs.copy(paths.shortcutsVdf + '.backup', paths.shortcutsVdf);
		console.log('Done.\n');

		process.exit(1);
	}

	try {
		console.log('Emptying grid image folder...');
		await fs.emptyDir(paths.grid);
		console.log('Done.\n');

		console.log('Copying grid images...');
		for (const entry of manifest) {
			if (entry.image) {
				await fs.copy(
					entry.image,
					path.join(paths.grid, entry.id + path.extname(entry.image))
				);
			}
		}
		console.log('Done.\n');
	} catch (err) {
		console.error('ERROR: ' + err);
		process.exit(1);
	}

	console.log('Update complete.');
};
