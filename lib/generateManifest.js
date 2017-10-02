const globby = require('globby');
const path = require('path');
const generateAppId = require('./generateAppId');
const template = require('./template');

async function globFirst(glob) {
	const result = await globby(glob);
	return result && result[0] && path.resolve(result[0]);
}

module.exports = async function generateManifest(config) {
	const manifest = [];

	for (const romConfig of config.roms) {
		const emulatorConfig = config.emulators[romConfig.emulator];
		const games = await globby(romConfig.glob);

		for (const game of games) {
			const file = '"' + path.resolve(game) + '"';
			const title = romConfig.name(game);
			const formattedTitle = config.formatTitle(title);

			const templateArgs = {
				file,
				title,
				console: romConfig.console
			};

			const cwd = `"${path.resolve(
				emulatorConfig.cwd || path.dirname(emulatorConfig.exec)
			)}"`;
			const exec = `"${path.resolve(emulatorConfig.exec)}"`;
			const launchOptions = template(emulatorConfig.args, templateArgs);

			const grid = await globFirst(template(romConfig.grid, templateArgs));
			const icon = await globFirst(template(romConfig.icon, templateArgs));

			manifest.push({
				id: generateAppId(exec, formattedTitle),
				title: formattedTitle,
				console: romConfig.console,
				file,
				grid,
				icon,
				exec,
				cwd,
				launchOptions
			});
		}
	}

	return manifest;
};
