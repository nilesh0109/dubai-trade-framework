'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var filter = require('gulp-filter');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles-reload', ['styles'], function() {
    return buildStyles()
        .pipe(browserSync.stream());
});

gulp.task('styles', function() {
    return buildStyles();
});

var buildStyles = function() {
    var sassOptions = {
        style: 'expanded',
        sourceComments: 'map',
        sourceMap: 'sass',
        outputStyle: 'nested'
    };

    var injectFiles = gulp.src([
        path.join(conf.paths.src, '/app/**/app.scss'),
        path.join('!' + conf.paths.src, '/app/index.scss')
    ], {
        read: false
    });

    var injectOptions = {
        transform: function(filePath) {
            filePath = filePath.replace(conf.paths.src + '/app/', '');
            return '@import "' + filePath + '";';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };
    var sourceStyleFilter = filter('styles.css ', {
        restore: true
    });
    var applicationStyleFilter = filter('index.css ', {
        restore: true
    });

    return gulp.src([
            path.join(conf.paths.src, '/app/index.scss'),
            path.join(conf.paths.src, '/Res/css/styles.scss')
        ])
        .pipe($.inject(injectFiles, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe($.sourcemaps.init())
        .pipe($.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
        .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
        .pipe($.sourcemaps.write())
        .pipe(sourceStyleFilter)
        .pipe(gulp.dest(path.join(conf.paths.src, '/Res/css/')))
        .pipe(sourceStyleFilter.restore)
        .pipe(applicationStyleFilter)
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};