var gulp           = require('gulp'),
	gutil          = require('gulp-util' ),
	sass           = require('gulp-sass'),
	browserSync    = require('browser-sync'),
	concat         = require('gulp-concat'),
	uglify         = require('gulp-uglify'),
	cleanCSS       = require('gulp-clean-css'),
	rename         = require('gulp-rename'),
	del            = require('del'),
	imagemin       = require('gulp-imagemin'),
	pngquant       = require('imagemin-pngquant'),
	cache          = require('gulp-cache'),
	autoprefixer   = require('gulp-autoprefixer'),
	fileinclude    = require('gulp-file-include'),
	gulpRemoveHtml = require('gulp-remove-html'),
	bourbon        = require('node-bourbon'),
	ftp            = require('vinyl-ftp'),
	notify         = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('sass', function() {
	return gulp.src([
			'app/sass/fonts.sass',
			'app/sass/main.sass'
		])
		.pipe(sass({
			includePaths: bourbon.includePaths
		})
		.on("error", notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('js-build', function() {
	return gulp.src([
			'app/js/script.js',
		])
		.pipe(rename('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('libs-js', function() {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/fullpage.js/vendors/jquery.easings.min.js',
			'app/libs/fullpage.js/vendors/scrolloverflow.min.js',
			'app/libs/fullpage.js/dist/jquery.fullpage.min.js',
			'app/libs/bootstrap/dist/js/bootstrap.min.js',
			'app/libs/vegas/dist/vegas.min.js',
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('libs-css', function() {
	return gulp.src([
            'app/libs/bootstrap/dist/css/bootstrap.min.css',
			'app/libs/fullpage.js/dist/jquery.fullpage.min.css',
			'app/libs/vegas/dist/vegas.min.css',
		])
		.pipe(concat('libs.min.css'))
		.pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['sass', 'libs-js','libs-css', 'browser-sync'], function() {
	gulp.watch(['app/sass/**/*.sass','app/sass/**/*.scss'], ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); 
});

gulp.task('buildhtml', function() {
  gulp.src(['app/*.html'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('build', ['removedist', 'buildhtml', 'imagemin', 'sass', 'js-build', 'libs-js', 'libs-css'], function() {

	var buildCss = gulp.src('app/css/*.css').pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));

});

gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
