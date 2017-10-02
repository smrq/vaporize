const path = require('path');

const grid = 'D:/ROMs/_Grid_/${console}/${title}.@(jpg|png)';

module.exports = {
	steam: 'C:/Program Files (x86)/Steam',
	userId: '12104743',
	formatTitle,
	emulators: {
		dolphin: {
			exec: 'C:/Program Files/Dolphin/Dolphin.exe',
			args: '--batch --exec ${file}'
		},
		kegafusion: {
			exec: 'D:/Emulators/Fusion364/Fusion.exe',
			args: '${file}'
		},
		ppsspp: {
			exec: 'D:/Emulators/ppsspp/PPSSPPWindows64.exe',
			args: '${file}'
		},
		retroarchGba: {
			exec: 'C:/RetroArch/retroarch_gba.cmd',
			args: '${file}'
		},
		retroarchGbc: {
			exec: 'C:/RetroArch/retroarch_gbc.cmd',
			args: '${file}'
		},
		retroarchGenesis: {
			exec: 'C:/RetroArch/retroarch_genesis.cmd',
			args: '${file}'
		},
		retroarchPsx: {
			exec: 'C:/RetroArch/retroarch_psx.cmd',
			args: '${file}'
		},
		retroarchN64: {
			exec: 'C:/RetroArch/retroarch_n64.cmd',
			args: '${file}'
		},
		retroarchNds: {
			exec: 'C:/RetroArch/retroarch_nds.cmd',
			args: '${file}'
		},
		retroarchSnes: {
			exec: 'C:/RetroArch/retroarch_snes.cmd',
			args: '${file}'
		}
	},
	roms: [
		{
			console: 'Sega 32X',
			emulator: 'kegafusion',
			glob: 'D:/ROMs/32x/*.32x',
			name: formatters(baseFileName, stripTags),
			grid,
			icon: 'D:/ROMs/_Icons_/sega_genesis_32x.png'
		},
		{
			console: 'Nintendo DS',
			emulator: 'retroarchNds',
			glob: 'D:/ROMs/NDS/*.nds',
			name: formatters(baseFileName, stripGameNumber, stripTags),
			grid,
			icon: 'D:/ROMs/_Icons_/nintendo_ds_lite.png'
		},
		{
			console: 'Nintendo Game Boy Color',
			emulator: 'retroarchGbc',
			glob: 'D:/ROMs/Game Boy Color/*.gbc',
			name: formatters(baseFileName, stripTags),
			grid,
			icon: 'D:/ROMs/_Icons_/nintendo_game_boy_color.png'
		},
		{
			console: 'Nintendo Game Boy Advance',
			emulator: 'retroarchGba',
			glob: 'D:/ROMs/Game Boy Advance/*.gba',
			name: formatters(baseFileName, stripTags),
			grid,
			icon: 'D:/ROMs/_Icons_/nintendo_game_boy_advance.png'
		},
		{
			console: 'Nintendo Gamecube',
			emulator: 'dolphin',
			glob: 'D:/ROMs/Gamecube/*/game.iso',
			name: formatters(baseFolderName, stripGameId),
			grid,
			icon: 'D:/ROMs/_Icons_/nintendo_gamecube.png'
		},
		{
			console: 'Sega Genesis',
			emulator: 'retroarchGenesis',
			glob: 'D:/ROMs/Genesis/*.bin',
			name: formatters(baseFileName),
			grid,
			icon: 'D:/ROMs/_Icons_/sega_genesis.png'
		},
		{
			console: 'Nintendo 64',
			emulator: 'retroarchN64',
			glob: 'D:/ROMs/N64/*.z64',
			name: formatters(baseFileName, stripTags),
			grid,
			icon: 'D:/ROMs/_Icons_/nintendo_nintendo64.png'
		},
		{
			console: 'Sony PlayStation',
			emulator: 'retroarchPsx',
			glob: 'D:/ROMs/PS1/*/*.m3u',
			name: formatters(baseFileName),
			grid,
			icon: 'D:/ROMs/_Icons_/sony_playstation.png'
		},
		{
			console: 'Sony PlayStation Portable',
			emulator: 'ppsspp',
			glob: 'D:/ROMs/PSP/*.iso',
			name: formatters(baseFileName),
			grid,
			icon: 'D:/ROMs/_Icons_/sony_psp.png'
		},
		{
			console: 'Sega CD',
			emulator: 'retroarchGenesis',
			glob: 'D:/ROMs/Sega CD/*/*.cue',
			name: formatters(baseFileName),
			grid,
			icon: 'D:/ROMs/_Icons_/sega_genesis.png'
		},
		{
			console: 'Super Nintendo',
			emulator: 'retroarchSnes',
			glob: 'D:/ROMs/Super Nintendo/*.@(sfc|smc)',
			name: formatters(baseFileName),
			grid,
			icon: 'D:/ROMs/_Icons_/nintendo_super_nes.png'
		},
		{
			console: 'Nintendo Wii',
			emulator: 'dolphin',
			glob: 'D:/ROMs/Wii/*/*.wbfs',
			name: formatters(baseFolderName, stripGameId),
			grid,
			icon: 'D:/ROMs/_Icons_/nintendo_wii.png'
		},
		{
			console: 'Nintendo Wii Ware',
			emulator: 'dolphin',
			glob: ['D:/ROMs/Wii Ware/*.wad', '!**/* DLC.wad'],
			name: formatters(baseFileName),
			grid,
			icon: 'D:/ROMs/_Icons_/nintendo_wii.png'
		}
	]
};

function formatTitle(name) {
	return name.replace(/ - /, ': ');
}

function formatters(...list) {
	return file => list.reduce((name, formatter) => formatter(name), file);
}

function baseFileName(file) {
	return path.parse(file).name;
}

function baseFolderName(file) {
	return path.basename(path.resolve(file, '..'));
}

function stripGameNumber(file) {
	return file.replace(/^\d+\s*-\s*/, '');
}

function stripTags(file) {
	return file.replace(/\s*[\[\(].*[\]\)]/, '');
}

function stripGameId(file) {
	return file.replace(/\s*\[.{6}\]$/, '');
}
