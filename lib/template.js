const lodashTemplate = require('lodash.template');

module.exports = function template(string, map) {
	// ES template regex from Lodash source
	// https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L176
	const interpolate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	return lodashTemplate(string, { interpolate })(map);
};
