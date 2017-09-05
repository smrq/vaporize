const shortcutEditor = require('steam-shortcut-editor');

module.exports = async function generateUpdatedVdf(
	config,
	originalVdf,
	manifest
) {
	const vdf = await shortcutEditor.parseBuffer(originalVdf);
	vdf.shortcuts = vdf.shortcuts.filter(
		shortcut => !shortcut.tags.includes(config.tag)
	);
	vdf.shortcuts.push(
		...manifest.map(entry => ({
			AppName: entry.title,
			exe: entry.exec,
			StartDir: entry.cwd,
			icon: '',
			ShortcutPath: '',
			LaunchOptions: entry.launchOptions,
			IsHidden: false,
			AllowDesktopConfig: true,
			OpenVR: false,
			tags: [entry.console, config.tag]
		}))
	);
	return shortcutEditor.writeBuffer(vdf);
};
