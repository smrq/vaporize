const { crc32 } = require('crc');
const Long = require('long');

module.exports = function generateAppId(executableLocation, title) {
	const crc = crc32(executableLocation + title);
	return new Long(0x02000000, crc | 0x80000000, true).toString();
};
