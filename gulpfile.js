/*
* Simple GULP tooling
* Copyright AppSeed (https://appseed.us)
* License MIT
*/

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var del = require('del');
const htmlmin = require('gulp-htmlmin');
const cssbeautify = require('gulp-cssbeautify');
var gulp = require('gulp');
const npmDist = require('gulp-npm-dist');
var sass = require('gulp-sass')(require('sass'));
var wait = require('gulp-wait');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');

// Define paths

const paths = {
    dist: {
        base: './dist/',
        css: './dist/css',
        html: './dist/pages',
        assets: './dist/assets',
        img: './dist/assets/img',
        vendor: './dist/vendor'
    },
    dev: {
        base: './html/',
        css: './html/css',
        html: './html/pages',
        assets: './html/assets',
        img: './html/assets/img',
        vendor: './html/vendor'
    },
    base: {
        base: './',
        node: './node_modules'
    },
    src: {
        base: './src/',
        css: './src/assets/css',
        html: './src/pages/**/*.html',
        assets: './src/assets/**/*.*',
        partials: './src/partials/**/*.html',
        scss: './src/assets/scss',
        node_modules: './node_modules/',
        vendor: './vendor'
    },
    temp: {
        base: './.temp/',
        css: './.temp/assets/css',
        html: './.temp/pages',
        assets: './.temp/assets',
        vendor: './.temp/vendor'
    }
};

// Compile SCSS -> temp
gulp.task('scss-tmp', function () {
    return gulp.src([paths.src.scss + '/app.scss'])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.temp.css))
        .pipe(browserSync.stream());
});

// Compile CSS
gulp.task('scss', function () {
    return gulp.src([paths.src.scss + '/app.scss'])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.src.css))
        .pipe(browserSync.stream());
});

gulp.task('index', function () {
    return gulp.src([paths.src.base + '*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            context: {
                environment: 'development'
            }
        }))
        .pipe(gulp.dest(paths.temp.base))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src([paths.src.html])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            context: {
                environment: 'development'
            }
        }))
        .pipe(gulp.dest(paths.temp.html))
        .pipe(browserSync.stream());
});

gulp.task('assets', function () {
    return gulp.src([paths.src.assets])
        .pipe(gulp.dest(paths.temp.assets))
        .pipe(browserSync.stream());
});

gulp.task('vendor', function() {
    return gulp.src(npmDist(), { base: paths.src.node_modules })
      .pipe(gulp.dest(paths.temp.vendor));
});

gulp.task('serve', gulp.series('scss-tmp', 'html', 'index', 'assets', 'vendor', function() {
    browserSync.init({
        server: paths.temp.base
    });

    gulp.watch([paths.src.scss + '/app.scss'], gulp.series('scss'));
    gulp.watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], gulp.series('html', 'index'));
    gulp.watch([paths.src.assets], gulp.series('assets'));
    gulp.watch([paths.src.vendor], gulp.series('vendor'));
}));

// Beautify CSS
gulp.task('beautify:css', function () {
    return gulp.src([
        paths.dev.css + '/app.css'
    ])
        .pipe(cssbeautify())
        .pipe(gulp.dest(paths.dev.css))
});

// Minify CSS
gulp.task('minify:css', function () {
    return gulp.src([
        paths.dist.css + '/app.css'
    ])
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.dist.css))
});

// Minify Html
gulp.task('minify:html', function () {
    return gulp.src([paths.dist.html + '/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            context: {
                environment: 'production'
            }
        }))
        .pipe(gulp.dest(paths.dist.html))
});

gulp.task('minify:html:index', function () {
    return gulp.src([paths.dist.base + '*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            context: {
                environment: 'production'
            }
        }))
        .pipe(gulp.dest(paths.dist.base))
});

// Clean
gulp.task('clean:dist', function () {
    return del([paths.dist.base]);
});

gulp.task('clean:dev', function () {
    return del([paths.dev.base]);
});

// Compile and copy scss/css
gulp.task('copy:dist:css', function () {
    return gulp.src([paths.src.scss + '/app.scss'])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.css))
});

gulp.task('copy:dev:css', function () {
    return gulp.src([paths.src.scss + '/app.scss'])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dev.css))
});

// Copy Html
gulp.task('copy:dist:html', function () {
    return gulp.src([paths.src.html])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            context: {
                environment: 'production'
            }
        }))
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task('copy:dev:html', function () {
    return gulp.src([paths.src.html])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            context: {
                environment: 'development'
            }
        }))
        .pipe(gulp.dest(paths.dev.html));
});

// Copy index
gulp.task('copy:dist:html:index', function () {
    return gulp.src([paths.src.base + '*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            context: {
                environment: 'production'
            }
        }))
        .pipe(gulp.dest(paths.dist.base))
});

gulp.task('copy:dev:html:index', function () {
    return gulp.src([paths.src.base + '*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            context: {
                environment: 'development'
            }
        }))
        .pipe(gulp.dest(paths.dev.base))
});

// Copy assets
gulp.task('copy:dist:assets', function () {
    return gulp.src(paths.src.assets)
        .pipe(gulp.dest(paths.dist.assets))
});

gulp.task('copy:dev:assets', function () {
    return gulp.src(paths.src.assets)
        .pipe(gulp.dest(paths.dev.assets))
});

// Copy node_modules to vendor
gulp.task('copy:dist:vendor', function() {
    return gulp.src(npmDist(), { base: paths.src.node_modules })
      .pipe(gulp.dest(paths.dist.vendor));
});

gulp.task('copy:dev:vendor', function() {
    return gulp.src(npmDist(), { base: paths.src.node_modules })
      .pipe(gulp.dest(paths.dev.vendor));
});

gulp.task('dev' , gulp.series('clean:dev' , 'copy:dev:css', 'copy:dev:html', 'copy:dev:html:index', 'copy:dev:assets', 'beautify:css', 'copy:dev:vendor'));
gulp.task('prod', gulp.series('clean:dist', 'copy:dist:css', 'copy:dist:html', 'copy:dist:html:index', 'copy:dist:assets', 'minify:css', 'minify:html', 'minify:html:index', 'copy:dist:vendor'));

// Default
gulp.task('default', gulp.series('serve'));
