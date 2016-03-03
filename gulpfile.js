var gulp = require('gulp')
var minifyhtml = require("gulp-minify-html")
var minifycss = require('gulp-minify-css')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var del = require('del')

// 压缩html
gulp.task('minify-html', function () {
    gulp.src('*.html') 
    .pipe(minifyhtml()) 
    .pipe(gulp.dest('dist/html'))
})

// 压缩css
gulp.task('minify-css', function() {
    return gulp.src('styles/*.css')      
        .pipe(minifycss())  
        .pipe(gulp.dest('dist/css'))         
})

// 压缩js
gulp.task('minify-js', function() {
    return gulp.src('scripts/*.js')
        .pipe(uglify())    
        .pipe(gulp.dest('dist/js'))
})

// 执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
 	del(['dist/css', 'dist/js','dist/html'], cb);
})

gulp.task('default', ['clean','minify-css','minify-js','minify-html']
)


