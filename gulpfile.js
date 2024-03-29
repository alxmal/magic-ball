var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	ftp = require('vinyl-ftp'),
	notify = require('gulp-notify');

// Скрипты

gulp.task('common-js', function() {
	return gulp
		.src(['./src/js/common.js'])
		.pipe(concat('common.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp
		.src([
			'./src/libs/jquery/dist/jquery.min.js',
			'./src/js/common.min.js' // Всегда в конце
		])
		.pipe(concat('scripts.min.js'))
		.pipe(uglify()) // Минимизировать весь js (на выбор)
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function() {
	browserSync({
		// server: {
		// 	baseDir: 'src'
		// },
		proxy: "localhost:8888",
		notify: false
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp
		.src('./src/sass/**/*.scss')
		.pipe(sass({ outputStyle: 'expand' }).on('error', notify.onError()))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(autoprefixer(['last 10 versions']))
		.pipe(cleanCSS()) // Опционально, закомментировать при отладке
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('./src/sass/**/*.scss', ['sass']);
	gulp.watch(['./src/libs/**/*.js', './src/js/*.js'], ['js']);
	gulp.watch('./*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp
		.src('./src/img/**/*')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {
	var buildFiles = gulp
		.src(['./app/*.html', './app/.htaccess'])
		.pipe(gulp.dest('dist'));

	var buildCss = gulp
		.src(['./app/css/main.min.css'])
		.pipe(gulp.dest('dist/css'));

	var buildJs = gulp
		.src(['./app/js/scripts.min.js'])
		.pipe(gulp.dest('dist/js'));

	var buildFonts = gulp
		.src(['./app/fonts/**/*'])
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('deploy', function() {
	var conn = ftp.create({
		host: 'hostname.com',
		user: 'username',
		password: 'userpassword',
		parallel: 10,
		log: gutil.log
	});

	var globs = ['dist/**', 'dist/.htaccess'];
	return gulp
		.src(globs, { buffer: false })
		.pipe(conn.dest('/path/to/folder/on/server'));
});

gulp.task('removedist', function() {
	return del.sync('dist');
});
gulp.task('clearcache', function() {
	return cache.clearAll();
});

gulp.task('default', ['watch']);
