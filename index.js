var through = require('through2'),
	flowRemoveTypes = require('flow-remove-types'),
	PluginError = require('gulp-util').PluginError;

module.exports = function gulpFlowRemoveTypes(options) {
	if(!options) {
		options = {}
	}

	return through.obj(function (file, enc, cb) {
		var result;
		if (file.isNull()) {
			return cb(null, file);
		}

		if (file.isBuffer()) {
			try {
				file.contents = new Buffer(flowRemoveTypes(file.contents.toString('utf8'), options).toString());
				this.push(file);
				cb();
			}
			catch (err) {
				throw new PluginError('gulp-flow-remove-types', err);
			}
		} else if (file.isStream()) {
			throw new PluginError('gulp-flow-remove-types', 'Streams are not supported!');
		}
	});
};