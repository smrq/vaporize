const shortcutEditor = require('steam-shortcut-editor');
const generateAppId = require('./generateAppId');

module.exports = async function generateUpdatedVdf(
	config,
	originalVdf,
	originalManifest,
	updatedManifest
) {
	const vdf = await shortcutEditor.parseBuffer(originalVdf);

	vdf.shortcuts.forEach(shortcut => {
		shortcut.__id__ = generateAppId(shortcut.exe, shortcut.AppName);
	});

	const removedEntries = originalManifest.filter(
		original => !updatedManifest.some(updated => original.id === updated.id)
	);
	const addedEntries = updatedManifest.filter(
		updated => !originalManifest.some(original => original.id === updated.id)
	);
	const updatedEntries = updatedManifest.filter(updated =>
		originalManifest.some(original => original.id === updated.id)
	);

	vdf.shortcuts = vdf.shortcuts.filter(
		shortcut => !removedEntries.some(entry => entry.id === shortcut.__id__)
	);

	for (entry of addedEntries) {
		const newShortcut = makeShortcut(entry);
		vdf.shortcuts.push(newShortcut);
	}

	for (entry of updatedEntries) {
		const existingShortcut = vdf.shortcuts.find(
			shortcut => shortcut.__id__ === entry.id
		);
		const newShortcut = makeShortcut(entry);
		Object.assign(existingShortcut, newShortcut);
	}

	vdf.shortcuts.forEach(shortcut => {
		delete shortcut.__id__;
	});

	return shortcutEditor.writeBuffer(vdf);

	function makeShortcut(entry) {
		return {
			AppName: entry.title,
			exe: entry.exec,
			StartDir: entry.cwd,
			icon: entry.icon || '',
			ShortcutPath: '',
			LaunchOptions: entry.launchOptions,
			IsHidden: false,
			AllowDesktopConfig: true,
			OpenVR: false,
			tags: [entry.console]
		};
	}
};
