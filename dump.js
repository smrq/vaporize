const fs = require('fs-extra');
const shortcutEditor = require('steam-shortcut-editor');

const parseConfig = require('./lib/parseConfig');
const calculateUpdates = require('./lib/calculateUpdates');

const config = parseConfig(require('./config'));
const paths = require('./lib/paths')(config);

(async function() {
	try {
		const {
			originalVdf,
			updatedVdf,
			originalManifest,
			updatedManifest
		} = await calculateUpdates(config, paths);

		await fs.writeFile(
			'./dump.json',
			JSON.stringify(
				{
					originalVdf: shortcutEditor.parseBuffer(originalVdf),
					updatedVdf: shortcutEditor.parseBuffer(updatedVdf),
					originalManifest,
					updatedManifest
				},
				null,
				'\t'
			)
		);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();
