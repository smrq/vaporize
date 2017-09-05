const groupBy = require('lodash.groupby');

module.exports = function checkManifest(manifest) {
	let ok = true;

	const entriesById = groupBy(manifest, entry => entry.id);
	for (const id of Object.keys(entriesById)) {
		if (entriesById[id].length > 1) {
			console.log('ERROR: Duplicate app id.');
			console.log('The following games have the same title and executable:');
			for (const entry of entriesById[id]) {
				console.log(`    ${entry.title} [${entry.console}] (${entry.file})`);
			}
			console.log(
				'Steam cannot have multiple games with the same title and executable.'
			);
			console.log(
				'You will need to rename these games so that their names are not the same,'
			);
			console.log('or make them use different executables.');
			console.log(
				'(Using different arguments to the same executable is not sufficient.)'
			);
			console.log('');
			ok = false;
		}
	}

	return ok;
};
