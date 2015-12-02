var fs = require('fs');
var gulp = require('gulp');
var karma = require('karma').server;
var es = require('event-stream');
var del = require('del');

// gulp tasks
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
var footer = require('gulp-footer');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var plumber = require('gulp-plumber');//To prevent pipe breaking caused by errors at 'watch'

require('gulp-release-tasks')(gulp);

var config = {
	pkg   : JSON.parse(fs.readFileSync('./package.json')),
	banner: '/*!\n' +
	' * <%= pkg.name %>\n' +
	' * <%= pkg.homepage %>\n' +
	' * Version: <%= pkg.version %> - <%= timestamp %>\n' +
	' * License: <%= pkg.license %>\n' +
	' */\n\n\n'
};

gulp.task('default', ['clean', 'build', 'test']);
gulp.task('build', ['scripts']);
gulp.task('test', ['build', 'karma']);

gulp.task('watch', ['build', 'karma-watch'], function () {
	gulp.watch(['src/**/*.{js,html}'], ['build']);
});

gulp.task('clean', function (cb) {
	del(['dist'], cb);
});

gulp.task('scripts', ['clean'], function () {
	var buildLib = function () {
		return gulp.src(['src/*.js'])
			.pipe(plumber({
				errorHandler: handleError
			}))
			.pipe(ngAnnotate())
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(jshint.reporter('fail'));
	};

	return es.merge(buildLib())
		.pipe(plumber({
			errorHandler: handleError
		}))
		.pipe(concat('ngInlineSvg.js'))
		.pipe(header(config.banner, {
			timestamp: (new Date()).toISOString(), pkg: config.pkg
		}))
		.pipe(gulp.dest('dist'))
		.pipe(uglify({preserveComments: 'some'}))
		.pipe(rename({ext: '.min.js'}))
		.pipe(gulp.dest('dist'));

});

gulp.task('karma', ['build'], function () {
	karma.start({configFile: __dirname + '/karma.conf.js', singleRun: true});
});

gulp.task('karma-watch', ['build'], function () {
	karma.start({configFile: __dirname + '/karma.conf.js', singleRun: false});
});

var handleError = function (err) {
	console.log(err.toString());
	this.emit('end');
};