var gulp = require('gulp'),
minifyhtml = require("gulp-minify-html"),
minifycss = require('gulp-minify-css'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
rename = require('gulp-rename'),
del = require('del');
//压缩html
gulp.task('minify_html', function () {
    gulp.src('*.html') 
    .pipe(minifyhtml()) 
    .pipe(gulp.dest('dist/html'));
});
//压缩css
gulp.task('minify_css', function() {
    return gulp.src('styles/*.css')      
        .pipe(minifycss())  
        .pipe(gulp.dest('dist/css'));   
        
});
//压缩js
gulp.task('minify_js', function() {
    return gulp.src('scripts/*.js')
        .pipe(uglify())    
        .pipe(gulp.dest('dist/js')); 
});
//执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
 	del(['dist/css', 'dist/js','dist/html'], cb);
});

gulp.task('default', ['clean','minify_css','minify_js','minify_html']
);


