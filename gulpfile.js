var del        = require('del')
gulp           = require('gulp'),
gulpif         = require('gulp-if'),
less           = require('gulp-less'),
csso           = require('gulp-csso'),
argv           = require('yargs').argv,
babel          = require('gulp-babel'),
uglify         = require('gulp-uglify'),
concat         = require('gulp-concat'),
browserSync    = require('browser-sync'),
buffer         = require('vinyl-buffer'),
postcss        = require('gulp-postcss'),
plumber        = require('gulp-plumber'),
nodemon        = require('gulp-nodemon'),
gulpSequence   = require('gulp-sequence'),
postcssPxtorem = require('postcss-pxtorem'),
sourcemaps     = require('gulp-sourcemaps'),
ngAnnotate     = require('gulp-ng-annotate'),
mainBowerFiles = require('main-bower-files'),
autoprefixer   = require('gulp-autoprefixer'),
exec           = require('child_process').exec,
templateCache  = require('gulp-angular-templatecache');

var sources = {
    less: [
        'client/less/reset.less',
        'client/less/mixins.less',
        'client/less/fonts.less',
        'client/less/**.less',
        'client/app/**/*.less',
        'client/components/**/*.less'
    ],
    templates: [
        'client/index.html',
        'client/{app,components}/**/*.html',
    ],
    script: [
        'client/app.js',
        'client/components/**/**.config.js',
        'client/components/**/**.js',
        'client/app/**/*.js',
    ],
    fonts: [
        'client/fonts/**/*.otf'
    ],
    images: [
        'client/images/**/*.+(jpg|jpeg|png|gif|ico|svg)'
    ],
    clean: [
        'client/dist',
        'node_modules',
        'client/vendors',
    ],
};

gulp.task('build' , [
    'less',
    'fonts',
    'images',
    'templates',
    'js:script',
    'js:vendors' ,
]);


gulp.task('default' , gulpSequence( 'build' , 'watch' ));



gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: 'server.js',
        watch: [
            'server.js',
            'server/**/*.js'
        ]
    }).on('start', function () {
        console.info('Server started');
        if (!started) {
            started = true;
            setTimeout( cb, 1000);
        }
    }).on('restart', function () {
        console.info('Server restarted');
        setTimeout( browserSync.reload , 3000);
    });
});


gulp.task('watch', ['browser-sync'], function () {
  gulp.watch( sources.less , ['less']);
  gulp.watch( sources.script , ['js:script']);
  gulp.watch( sources.templates , ['templates']);

  gulp.watch([ 'client/dist/*.js' ] , browserSync.reload );
  gulp.watch([ 'client/dist/*.html' ] , browserSync.reload );
  gulp.watch([ 'client/dist/**.css' ] , browserSync.reload );
});


gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'http://localhost:3000',
        browser: 'google chrome',
        port: 1337,
    });
});


gulp.task( 'clean', function () {
    return del( sources.clean );
});


gulp.task( 'less', function () {
    return gulp.src( sources.less )
        .pipe(sourcemaps.init())
        .pipe(concat('style.less'))
        .pipe( less() )
        .pipe(postcss([
            postcssPxtorem({
                replace:false,
                propWhiteList: []
            })
        ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('client/dist'));
});

gulp.task( 'fonts', function () {
    return gulp.src( sources.fonts )
        .pipe(gulp.dest('client/dist/fonts'));
});

gulp.task( 'images', function () {
    return gulp.src( sources.images )
        .pipe(gulp.dest('client/dist/images'));
});

gulp.task('templates', function () {
    return gulp.src( sources.templates )
        .pipe(gulp.dest('client/dist'));
});

gulp.task('js:vendors', function () {
    return gulp.src(mainBowerFiles())
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('client/dist'));
});

gulp.task('js:script', function () {
  return gulp.src( sources.script )
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('client/dist'));
});
