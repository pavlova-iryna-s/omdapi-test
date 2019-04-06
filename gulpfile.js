const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sass = require('gulp-sass');

gulp.task('js', function() {
    return browserify('./src/main.js')
        .transform(babelify, {
            presets: ['@babel/preset-env']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build'))
});

gulp.task('styles', function() {
    return gulp.src('assets/sass/**/*.scss')
        .pipe(sass({
            compass: true,
            includePaths: ['./node_modules/compass-mixins/lib'],
            style: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('images', function() {
    return gulp.src('assets/images/**/*.*')
        .pipe(gulp.dest('build/images/'));
});

gulp.task('default', gulp.series('js', 'styles', 'images'));
