const fs = require('fs-extra');
const path = require('path');

const parseConfig = require('./parseConfig');
const calculateUpdates = require('./calculateUpdates');

module.exports = async function run(config) {
	config = parseConfig(config);
	const paths = require('./paths')(config);
	const {
		originalVdf,
		updatedVdf,
		originalManifest,
		updatedManifest
	} = await calculateUpdates(config, paths);

	try {
		console.log('Backing up shortcuts file...');
		await fs.copy(paths.shortcutsVdf, paths.shortcutsVdf + '.backup');
		console.log('Done.\n');

		console.log('Backing up manifest file...');
		await fs.copy(
			paths.shortcutsManifestJson,
			paths.shortcutsManifestJson + '.backup'
		);
		console.log('Done.\n');
	} catch (err) {
		console.error('ERROR: ' + err);
		process.exit(1);
	}

	try {
		console.log('Writing manifest...');
		await fs.writeFile(
			paths.shortcutsManifestJson,
			JSON.stringify(updatedManifest, null, '\t')
		);
		console.log('Manifest written to: ' + paths.shortcutsManifestJson + '\n');

		console.log('Writing shortcuts file...');
		await fs.writeFile(paths.shortcutsVdf, updatedVdf);
		console.log('Done.\n');
	} catch (err) {
		console.error('ERROR: ' + err);

		try {
			console.log('Restoring shortcuts file backup...');
			await fs.copy(paths.shortcutsVdf + '.backup', paths.shortcutsVdf);
			console.log('Done.\n');

			console.log('Restoring manifest file backup...');
			await fs.copy(
				paths.shortcutsManifestJson + '.backup',
				paths.shortcutsManifestJson
			);
			console.log('Done.\n');
		} catch (err) {
			console.error('ERROR: ' + err + '\n');
			console.error(
				'Your configuration may have been left in an inconsistent state!'
			);
			console.error(
				'You may need to manually delete any remaining shortcuts and grid images.\n'
			);
		}

		process.exit(1);
	}

	console.log('Removing old grid images...');
	for (const entry of originalManifest) {
		if (entry.grid) {
			console.log(`    Removing: [${entry.id}] ${entry.title}`);
			try {
				await fs.unlink(
					path.join(paths.grid, entry.id + path.extname(entry.grid))
				);
			} catch (err) {
				console.error('ERROR: ' + err);
			}
		} else {
			console.log(`    Skipping (no image): [${entry.id}] ${entry.title}`);
		}
	}
	console.log('Done.\n');

	console.log('Copying grid images...');
	for (const entry of updatedManifest) {
		if (entry.grid) {
			console.log(`    Copying: [${entry.id}] ${entry.title}`);
			try {
				await fs.copy(
					entry.grid,
					path.join(paths.grid, entry.id + path.extname(entry.grid))
				);
			} catch (err) {
				console.error('ERROR: ' + err);
			}
		} else {
			console.log(`    Skipping (no image): [${entry.id}] ${entry.title}`);
		}
	}
	console.log('Done.\n');

	console.log('Update complete.');
};
