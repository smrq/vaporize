const path = require('path');

module.exports = {
	steam: 'C:/Program Files (x86)/Steam',
	userId: '12104743',
	tag: 'Managed by Vaporize',
	formatTitle,
	gridImage: 'D:/ROMs/_Grid_/${console}/${title}.@(jpg|png)',
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
		retroarchGb: {
			exec: 'C:/RetroArch/retroarch_gb.cmd',
			args: '${file}'
		},
		retroarchGba: {
			exec: 'C:/RetroArch/retroarch_gba.cmd',
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
			name: taggedName
		},
		{
			console: 'Nintendo Game Boy Color',
			emulator: 'retroarchGb',
			glob: 'D:/ROMs/Game Boy Color/*.gbc',
			name: taggedName
		},
		{
			console: 'Nintendo Game Boy Advance',
			emulator: 'retroarchGba',
			glob: 'D:/ROMs/Game Boy Advance/*.gba',
			name: taggedName
		},
		{
			console: 'Nintendo Gamecube',
			emulator: 'dolphin',
			glob: 'D:/ROMs/Gamecube/*/game.iso',
			name: gamecubeWiiName
		},
		{
			console: 'Sega Genesis',
			emulator: 'retroarchGenesis',
			glob: 'D:/ROMs/Genesis/*.bin',
			name: basicName
		},
		{
			console: 'Nintendo 64',
			emulator: 'retroarchN64',
			glob: 'D:/ROMs/N64/*.z64',
			name: taggedName
		},
		{
			console: 'Sony PlayStation',
			emulator: 'retroarchPsx',
			glob: 'D:/ROMs/PS1/*/*.m3u',
			name: basicName
		},
		{
			console: 'Sony PlayStation Portable',
			emulator: 'ppsspp',
			glob: 'D:/ROMs/PSP/*.iso',
			name: basicName
		},
		{
			console: 'Sega CD',
			emulator: 'retroarchGenesis',
			glob: 'D:/ROMs/Sega CD/*/*.cue',
			name: basicName
		},
		{
			console: 'Super Nintendo',
			emulator: 'retroarchSnes',
			glob: 'D:/ROMs/Super Nintendo/*.@(sfc|smc)',
			name: basicName
		},
		{
			console: 'Nintendo Wii',
			emulator: 'dolphin',
			glob: 'D:/ROMs/Wii/*/*.wbfs',
			name: gamecubeWiiName
		},
		{
			console: 'Nintendo Wii Ware',
			emulator: 'dolphin',
			glob: ['D:/ROMs/Wii Ware/*.wad', '!**/* DLC.wad'],
			name: basicName
		}
	]
};

function formatTitle(name) {
	return name.replace(/ - /, ': ');
}

function gamecubeWiiName(file) {
	file = path.resolve(file, '..');
	file = path.basename(file);
	file = stripGameId(file);
	return file;
}

function basicName(file) {
	file = baseFileName(file);
	return file;
}

function taggedName(file) {
	file = baseFileName(file);
	file = removeTags(file);
	return file;
}

function removeTags(file) {
	return file.replace(/\s*[\[\(].*[\]\)]/, '');
}

function stripGameId(file) {
	return file.replace(/\s*\[.{6}\]$/, '');
}

function baseFileName(file) {
	return path.parse(file).name;
}
