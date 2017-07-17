const gulp = require('gulp');
const gulpFlowRemoveTypes = require('../');

describe('gulp-javascript-obfuscator', function () {

	it('should emit same number of files', (done) => {
		let count = 0;
		const stream = gulp.src(['test/fixtures/simple.js']).pipe(gulpFlowRemoveTypes());
		stream.on('error', done);

		stream.on('data', (file) => ++count);

		stream.on('end', function () {
			expect(count).toBe(1);
			done.apply(this, arguments);
		});
	});

	it('should emit valid JS code after completion', (done) => {
		let count = 0;
		const stream = gulp.src(['test/fixtures/simple.js']).pipe(gulpFlowRemoveTypes());
		stream.on('error', done);

		stream.on('data', (file) => {
			eval(file.contents.toString());
			expect(square).toBeInstanceOf(Function);
			expect(square(3)).toBe(9);
			done();
		});
	});

	it('should accept `pretty` option', (done) => {
		let count = 0, nonPrettyFileLength;
		const stream = gulp.src(['test/fixtures/simple.js']).pipe(gulpFlowRemoveTypes());
		const streamPretty = gulp.src(['test/fixtures/simple.js']).pipe(gulpFlowRemoveTypes({pretty: true}));

		stream.on('error', done);
		streamPretty.on('error', done);

		stream.on('data', (file) => {
			nonPrettyFileLength = file.contents.toString().length;
		});

		streamPretty.on('data', (file) => {
			expect(file.contents.toString().length).toBeLessThan(nonPrettyFileLength);
			done();
		});
	});

	it('should accept `sourceMap` option', (done) => {
		let count = 0;
		const stream = gulp.src(['test/fixtures/simple.js']).pipe(gulpFlowRemoveTypes({sourceMap: true}));
		stream.on('error', done);

		stream.on('data', (file) => ++count);

		stream.on('end', function () {
			expect(count).toBe(2);
			done.apply(this, arguments);
		});
	});

});