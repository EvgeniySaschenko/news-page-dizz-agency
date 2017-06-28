const gulp = require('gulp');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const coffee = require('gulp-coffee');
const yamlData = require('gulp-yaml-data');
const concat = require('gulp-concat');
const spritesmith = require('gulp.spritesmith');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');



// Сервер - при изменениях файлов в заданных папках обновляет страницу в браузере
gulp.task('serve', ['pug', 'stylus', 'coffee', 'copy', 'sprite'], () => {
	browserSync.init({
			server: {
				baseDir: "./build/"
			}
	});


	gulp.watch('src/assets/', ['copy']);
	gulp.watch('src/**/*.styl', ['stylus']);
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('srs/assets/img/sprites/*.*', ['sprite']);
	gulp.watch('src/**/*.coffee', ['coffee']);
	gulp.watch('build/**/*.*').on('change', browserSync.reload);
});


// PUG
gulp.task('pug', () => {
	return gulp.src('src/*.pug')
	.pipe(yamlData({
			property: 'data',
			src: 'src/data/data.yml',
			override: false 
	}))
	.pipe(pug())
	.pipe(gulp.dest('build/'));
});

// STYLUS
gulp.task('stylus', () => {
	return gulp.src('src/assets/news-page.styl')
	.pipe(stylus())
	.pipe(autoprefixer())
	.pipe(csso())
	.pipe(gulp.dest('build/css/'));
});

// COFFEE
gulp.task('coffee', () => {
	return gulp.src('src/**/*.coffee')
	.pipe(coffee())
	.pipe(concat('news-page.js'))
	.pipe(uglify())
	.pipe(gulp.dest('build/js/'));
});

// COPY
gulp.task('copy', () => {
	gulp.src('src/assets/font/**/*')
		.pipe(gulp.dest('build/font'));
	gulp.src('src/assets/img/**/*')
		.pipe(gulp.dest('build/img'));
	gulp.src('src/assets/vendor/**/*')
		.pipe(gulp.dest('build/vendor'));
});

// SPRITE
gulp.task('sprite', function () {
	var spriteData = gulp.src('src/assets/img/sprites/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.css'
	}));
	return spriteData.pipe(gulp.dest('build/img'));
});


gulp.task('default', ['serve']);