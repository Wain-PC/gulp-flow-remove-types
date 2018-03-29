var through = require('through2'),
	flowRemoveTypes = require('flow-remove-types'),
	Vinyl = require('vinyl'),
	PluginError = require('plugin-error');

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
				const result = flowRemoveTypes(file.contents.toString('utf8'), options);
				file.contents = new Buffer(result.toString());
				this.push(file);

				//sourceMap option support
				if(options.sourceMap) {
					this.push(new Vinyl({
						cwd: file.cwd,
						base: file.base,
						path: file.path + '.map',
						contents: new Buffer(JSON.stringify(result.generateMap()))
					}))
				}

				return cb();
			}
			catch (err) {
				return cb(new PluginError('gulp-flow-remove-types', err.message, {
					lineNumber: err.loc.line,
					fileName: file.path ? file.relative : null
				}));
			}
		} else if (file.isStream()) {
			return cb(new PluginError('gulp-flow-remove-types', 'Streams are not supported!'));
		}
	});
};