const config = require('./config');
const run = require('./lib');

(async function() {
	try {
		await run(config);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
})();
