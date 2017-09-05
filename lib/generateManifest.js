const globby = require('globby');
const path = require('path');
const generateAppId = require('./generateAppId');
const template = require('./template');

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

			const images = await globby(template(config.gridImage, templateArgs));
			const image = images && images[0];

			manifest.push({
				id: generateAppId(exec, formattedTitle),
				title: formattedTitle,
				console: romConfig.console,
				file,
				image,
				exec,
				cwd,
				launchOptions
			});
		}
	}

	return manifest;
};
